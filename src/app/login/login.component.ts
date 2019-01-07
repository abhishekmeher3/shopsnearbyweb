import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class loginComponent implements OnInit {
  email: string = '';
  password: string = '';

  abhishek = '';
  name = '';
  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.email && this.password) {
      this.loginService.doLogIn(this.email, this.password).subscribe(
        (response: any) => {
          console.log(JSON.stringify(response));
          response['password'] = this.password; // added for use when fetching from localStorage, as there password doesn't get returned from the response
          localStorage.setItem('shopsnearbyme', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }
}
