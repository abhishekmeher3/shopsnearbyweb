import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class loginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  login(){
    if(this.email && this.password){
      this.loginService.doLogIn({
        emailId: this.email,
        password: this.password,
      });
    }
  }

}
