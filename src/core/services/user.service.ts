import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User>{
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };  
    return this.http.post<User>("http://122.175.60.20:8104/users/login", body.toString(), options)
  }

  signup(email:string, phone:string, userType:string): Observable<object>{
    let body = new FormData();
    body.append('email', email);
    body.append('phoneNumber', phone);
    return this.http.post<User>("http://122.175.60.20:8104/users/login", body.toString())
  }
}
