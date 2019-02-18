import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {} from 'googlemaps';
import {config} from '../../configs/baseconfig';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.post<User>(
      `${config.API_URL}/users/login`,
      body.toString(),
      options
    );
  }

  signup(user: User): Observable<any> {
    let body = new FormData();
    body.append('firstName', user.firstName);
    body.append('lastName', user.lastName);
    body.append('email', user.email);
    body.append('phoneNumber', user.phoneNumber);
    body.append('address', user.address);
    body.append('latitude', user.latitude.toString());
    body.append('longitude', user.longitude.toString());
    body.append('type', user.type);
    return this.http.post<any>(`${config.API_URL}/users/signup`, body);
  }

  setUserToLocalStorage(userData) {
    localStorage.setItem('shopsnearbyme', userData);
  }

  getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('shopsnearbyme'));
  }

  isSignedIn(): boolean{
      let user = this.getUserFromLocalStorage()
      if(user)return true
      else return false
  }
}
