import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private http: HttpClient) {}
  doLogIn(username: string, password: string) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.http.post(
      'http://122.175.60.20:8104/users/login',
      body.toString(),
      this.httpOptions
    );
  }
}
