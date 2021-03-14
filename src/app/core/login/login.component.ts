import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authService.obtainAccessToken(this.user);
  }

}
