import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CustomizeCookieService } from './customize-cookie.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _isLoading = false;

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public errorMgs: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private BASE_URL = environment.baseUrl;
  private API_URL = environment.authApiUrl;
  private END_POINT = '/oauth/token';
  private USER_DETAILS = this.BASE_URL + this.API_URL + '/api/coreUser/user-details';
  private AUTH_URL = `${this.BASE_URL}${this.API_URL}${this.END_POINT}`;

  userDetils: any = {};
  localStorageObj: any = {}

  private CLIENT_ID = 'medClientIdPassword';
  private PASSWORD = 'secret';
  private GRANT_TYPE = 'password';


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private cookie: CustomizeCookieService
  ) { }

  obtainAccessToken(user: User) {
    this._isLoading = true;
    this.isLoading.next(this._isLoading);

    const params = new HttpParams()
      .set('username', user.userName)
      .set('password', user.password)
      .set('grant_type', this.GRANT_TYPE)
      .set('client_id', this.CLIENT_ID);

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.CLIENT_ID}:${this.PASSWORD}`),
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    this.httpClient.post<any>(this.AUTH_URL, params.toString(), { headers }).pipe(
      map(res => res))
      .subscribe(
        data => {
          this.saveToken(data);
          this._isLoading = false;
          this.isLoading.next(this._isLoading);
          this.errorMgs.next('');
        },
        err => {
          this._isLoading = false;
          this.isLoading.next(this._isLoading);
          console.error('Credentials error ', err);
          var errorMessage = navigator.onLine ? err.error.error_description : 'Please check your internet connection or try again later';

          if (errorMessage === undefined) {
            errorMessage = 'Service not available, please contact with Administrator';
          }
          this.errorMgs.next(errorMessage);
        }
      );
  }

  //========================================
  loadingStatus(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  messStatus(): Observable<string> {
    return this.errorMgs.asObservable();
  }

  saveToken(token) {
    var expireDate = token.expires_in;
    this.cookie.setWithExpiryInSeconds("access_token", token.access_token, expireDate);
    this.setUserInformation();
  }

  setUserInformation() {
    this.httpClient.get<any>(this.USER_DETAILS, <any>{}).subscribe(
      res => {
        this.userDetils = res
        const _userInfo = this.userDetils.obj;
        const companyList = this.userDetils.companyList;

        if (companyList) {
          Object.keys(companyList).forEach((key, value, array) => {
            if (companyList[key].companyId == _userInfo.defaultCompanyId) {
              _userInfo.companyAddress1 = companyList[key].compnayAddress1
              _userInfo.companyAddress2 = companyList[key].compnayAddress2
            }
          });
        }
        if (this.userDetils.obj != null) {
          localStorage.setItem('userInfo', JSON.stringify(this.userDetils.obj));
          if (this.userDetils.obj.userDefaultPageLink) {
            this.router.navigate([this.userDetils.obj.userDefaultPageLink]);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          localStorage.setItem('userInfo', JSON.stringify(null));
          this.router.navigate(['/']);
        }
      },
      error => {
        localStorage.setItem('userInfo', JSON.stringify(null));
        this.router.navigate(['/']);
        console.log('Error : ', error);
      }
    );
  }

  getAccessToken(): any {
    return this.cookie.get('access_token');
  }

  refreshAccessToken(): Observable<any> {
    const currentToken = this.obtainNewAccessToken();
    return of(this.obtainNewAccessToken()).pipe();
  }

  obtainNewAccessToken(): Observable<any> {
    return new Observable;
  }


  checkCredentials() {
    if (!this.cookie.get('access_token')) {
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
    }
  }

  //================ For Log Out =================

  logout() {
    this.deleteToken().subscribe(
      res => {
        if (res.success) {
          this.cookie.delete('access_token');
          localStorage.clear();
          this.router.navigate(['/']);
        }
        else {
          this.cookie.delete('access_token');
          localStorage.clear();
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log('log out error ::: ', error);
        this.cookie.delete('access_token');
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  deleteToken(): Observable<any> {

    const headers = {
      'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    const deleteAPIURL = `${this.BASE_URL}${this.AUTH_URL}${this.END_POINT}/logout`;
    return this.httpClient.delete<any>(deleteAPIURL, { headers }).pipe(
      map((res: Response) => res),
      catchError((error: any) => {
        return throwError(error);
      })
    );

  }

  get isLoggedIn() {
    this.checkCredentials();
    return this.loggedIn.asObservable();
  }
}
