import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {UserService} from '../../core/services/user.service';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {GeocodeService} from 'src/core/services/geocode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class loginComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean;
  loginError: {isError: boolean; message: string} = {
    isError: false,
    message: '',
  };

  constructor(
    public loginService: LoginService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private geocodeService: GeocodeService
  ) {}

  ngOnInit() {}

  login() {
    let validationResult = this.validate();
    if (validationResult.status === true) {
      this.loading = true;
      this.geocodeService.fetchAndSaveLocation().then(address => {
        this.loginService.doLogIn(this.email, this.password).subscribe(
          (response: any) => {
            response['password'] = this.password; // added for use when fetching from localStorage, as there password doesn't get returned from the response
            this.userService.setUserToLocalStorage(JSON.stringify(response));
            this.router.navigate(['/home']);
            this.loading = false;
          },
          error => {
            console.log(error);
            this.loginError = {
              isError: true,
              message: this.getErrorMEssage(error),
            };
            this.loading = false;
          }
        );
      });
    } else {
      this.loading = false;
    }
  }

  getErrorMEssage(error: any) {
    let message = '';
    if (error.error.message === 'User not found') {
      message = 'Please enter valid email id or password';
    }

    return message;
  }

  validate(): any {
    if (!this.email) return {status: false, message: 'Email cannot be empty'};
    if (!this.password)
      return {status: false, message: 'Password cannot be empty'};
    return {status: true};
  }

  showDialog(title: string, message: string) {
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {title: title, message: message},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
