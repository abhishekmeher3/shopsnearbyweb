import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LatLng, ResolvedAddress } from '../models/Models';
import { Observable } from 'rxjs';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private http: HttpClient) { }

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
