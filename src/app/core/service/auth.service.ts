import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CustomizeCookieService } from './customize-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public _isLoading = false;
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public errorMgs: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public USER_DETAILS = null;

  userDetils: any = {};
  localStorageObj: any = {}

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private cookie: CustomizeCookieService
  ) { }

  obtainAccessToken(user: any) {
    console.log('user === > ', user);
  }

  //========================================
  loadingStatus(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  messStatus(): Observable<string> {
    return this.errorMgs.asObservable();
  }

  saveToken(token) {
    console.log(token);
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
}
