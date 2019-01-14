import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LatLng, ResolvedAddress} from '../models/Models';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient, private userService: UserService) {}

  resolveAddress(latlng: LatLng): Observable<ResolvedAddress> {
    return Observable.create(observer => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: {
            lat: latlng.latitude,
            lng: latlng.longitude,
          },
        },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let resolvedAddress: ResolvedAddress = {
              latlng: latlng,
              formattedAddress: results[0].formatted_address,
              completeAddress: this.parseCompleteAddress(
                results[0].address_components
              ),
            };
            observer.next(resolvedAddress);
            observer.complete();
          } else {
            observer.error({message: 'Geocoder Failed'});
            observer.complete();
          }
        }
      );
    });
  }
  parseCompleteAddress(address_components) {
    let completeAddress = {
      streetNum: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    };
    for (var i = 0; i < address_components.length; i++) {
      var addr = address_components[i];
      if (addr.types.indexOf('country') !== -1)
        completeAddress.country = addr.long_name;
      else if (
        addr.types.indexOf('street_address') !== -1 ||
        addr.types.indexOf('establishment') !== -1 ||
        addr.types.indexOf('route') !== -1 ||
        addr.types.indexOf('sublocality') !== -1 ||
        addr.types.indexOf('neighborhood') !== -1
      ) {
        if (completeAddress.address) {
          completeAddress.address = `${completeAddress.address}, ${
            addr.long_name
          }`;
        } else {
          completeAddress.address = addr.long_name;
        }
      } else if (addr.types.indexOf('street_number') !== -1)
        completeAddress.streetNum = addr.long_name;
      else if (addr.types.indexOf('postal_code') !== -1)
        completeAddress.pincode = addr.short_name;
      else if (addr.types.indexOf('administrative_area_level_1') !== -1)
        completeAddress.state = addr.long_name;
      else if (addr.types.indexOf('locality') !== -1)
        completeAddress.city = addr.long_name;
    }
    return completeAddress;
  }
  getLatitudeLongitude(current = true): Promise<LatLng> {
    return new Promise((resolve, reject) => {
      if (current) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(location) {
            resolve({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          });
        }
      } else {
        resolve({
          latitude: Number(this.userService.getUserFromLocalStorage().latitude),
          longitude: Number(
            this.userService.getUserFromLocalStorage().longitude
          ),
        });
      }
    });
  }
}
