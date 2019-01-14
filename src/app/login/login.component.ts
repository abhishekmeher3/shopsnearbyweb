import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {UserService} from '../../core/services/user.service';

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
  constructor(
    public loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  login() {
    if (this.email && this.password) {
      this.loginService.doLogIn(this.email, this.password).subscribe(
        (response: any) => {
          response['password'] = this.password; // added for use when fetching from localStorage, as there password doesn't get returned from the response
          this.userService.setUserToLocalStorage(JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error => {
          console.error(
            `There is some issue with the login service ${JSON.stringify(
              error
            )}. Please contact administrator.`
          );
        }
      );
    }
  }
}
