import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): any {
    console.log('Checking if user is logged in : ' + this.isUserLoggedIn());
    if (this.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return;
  }
  isUserLoggedIn(): boolean {
    return Boolean(localStorage.getItem('shopsnearbyme'));
  }
}
