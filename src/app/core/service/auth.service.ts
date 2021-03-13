import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  obtainAccessToken(user: any) {
    console.log('user === > ', user);
  }
}
