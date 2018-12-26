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
          console.log(response.id);
          console.log(JSON.stringify(response));
          this.router.navigate(['/filters']);

          //  if (
          //     localStorage.getItem('userId') &&
          //     response.id === localStorage.getItem('userId')
          //   ) {
          //     // routes to a different page.
          //     console.log('User already present :' + JSON.stringify(response));
          //   } else {
          //     localStorage.setItem('userId', response.id);
          //     console.log('New User alert :' + JSON.stringify(response));
          //   }
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }
}
