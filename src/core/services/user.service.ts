import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { } from 'googlemaps';
import { LatLng, ResolvedAddress } from '../models/Models';

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

  signup(user: User): Observable<any>{
    let body = new FormData();
    body.append('firstName', user.firstName)
    body.append('lastName', user.lastName)
    body.append('email', user.email)
    body.append('phoneNumber', user.phoneNumber)
    body.append('address', user.address)
    body.append('latitude', user.latitude.toString())
    body.append('longitude', user.longitude.toString())
    body.append('type', user.type)
    return this.http.post<any>("http://122.175.60.20:8104/users/signup", body)
  }

  resolveAddress(latlng: LatLng): Observable<ResolvedAddress>{
    return Observable.create(observer=>{
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        location: {
          lat: latlng.latitude,
          lng: latlng.longitude
        }
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let resolvedAddress: ResolvedAddress = {
            latlng : latlng,
            formattedAddress: results[0].formatted_address
          }
          observer.next(resolvedAddress)
          observer.complete()
        }else{
          observer.error({message: "Geocoder Failed"})
          observer.complete()
        }
      })
    })
    
  }

}
