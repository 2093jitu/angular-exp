import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('user :::: ', this.user);
    this._authService.obtainAccessToken(this.user);
  }

}
