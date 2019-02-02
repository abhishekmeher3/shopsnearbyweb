import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

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

  constructor(
    public loginService: LoginService,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() { }

  login() {
    let validationResult = this.validate()
    if (validationResult.status === true) {
      this.loginService.doLogIn(this.email, this.password).subscribe(
        (response: any) => {
          response['password'] = this.password; // added for use when fetching from localStorage, as there password doesn't get returned from the response
          this.userService.setUserToLocalStorage(JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.showDialog("Login Error:", error.error.message)
          this.loading = false
        }
      );
    } else {
      this.showDialog("Validation Error", validationResult.message)
      this.loading = false
    }
  }

  validate(): any {
    if (!this.email) return { status: false, message: "Email cannot be empty" }
    if (!this.password) return { status: false, message: "Password cannot be empty" }
    return { status: true }
  }

  showDialog(title: string, message: string) {
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }
}
