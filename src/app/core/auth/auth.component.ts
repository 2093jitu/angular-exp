import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  appClientName = environment.appClientName;
  
  constructor() { }

  ngOnInit() {
    console.log('appClientName', this.appClientName);
    
  }

}
