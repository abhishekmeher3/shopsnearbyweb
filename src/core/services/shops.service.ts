import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LatLng, UserLogin, Category } from '../models/Models';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop.model';
import { config } from '../../configs/baseconfig'

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private hyderabadLatng: LatLng = {
    latitude: 17.3850,
    longitude: 78.4867
  }

  constructor(private http: HttpClient) { }


  public getRecommendedAndOtherShops(
    userlogin: UserLogin,
    latlng: LatLng,
    categories: Category[],
    distance: number): Observable<Shop[]> {
    latlng = this.sanitizeLatLng(latlng)
    let url: string = config.API_URL + "/shops/recommendedAndOthers?latitude=" + latlng.latitude
      + "&longitude=" + latlng.longitude + "&range=" + distance;
    categories.forEach(category => {
      url = url + "&categories=" + category.value;
    })
    return this.simpleGetRequest<Shop[]>(url, userlogin)
  }

  public getNearByShops(userlogin?: UserLogin, latlng?: LatLng): Observable<Shop[]> {
    latlng = this.sanitizeLatLng(latlng)
    let url = config.API_URL + "/shops/others?latitude=" + latlng.latitude + "&longitude=" + latlng.longitude + "&range=20000"
    return this.simpleGetRequest<Shop[]>(url, userlogin)
  }

  private simpleGetRequest<T>(url: string, userlogin: UserLogin): Observable<T> {
    let headers = this.setBasicAuthHeader(userlogin)
    let options = {
      headers: headers
    };
    return this.http.get<T>(url, options)
  }

  private sanitizeLatLng(latlng: LatLng): LatLng {
    if (latlng && latlng.latitude && latlng.longitude) {
      return latlng
    } else {
      return this.hyderabadLatng
    }
  }

  private setBasicAuthHeader(userlogin: UserLogin) {
    if (userlogin && userlogin.email && userlogin.password)
      return new HttpHeaders().set('Authorization', this.getBasicAuthhash(userlogin))
  }
  private getBasicAuthhash(userlogin: UserLogin) {
    if (userlogin) return 'Basic ' + btoa(userlogin.email + ':' + userlogin.password)
    else return 'Basic ' + 'unknown' //not the right way to handle this, probably should throw an error
  }


}
