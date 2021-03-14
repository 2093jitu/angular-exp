import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  obtainAccessToken(user: any) {
    console.log('user === > ', user);
  }

  refreshAccessToken(): Observable<any> {

    return null
  }
}
