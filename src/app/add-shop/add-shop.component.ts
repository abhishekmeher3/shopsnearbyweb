import {Component, OnInit} from '@angular/core';
import {ShopsService} from '../../core/services/shops.service';
import {GeocodeService} from 'src/core/services/geocode.service';
import {LatLng} from '../../core/models/Models';
import {UserService} from 'src/core/services/user.service';

@Component({
  selector: 'app-addshop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css'],
})
export class AddShop implements OnInit {
  loaderForReadOnly = false;
  inValidAddress = false;
  selectedImageUrl: any = '';
  fileSelected: any;
  imageUpload = false;
  categories = ['Toys', 'Automobile', 'Electricity'];
  //Hyderabad location
  latitude: number = 17.385;
  longitude: number = 78.4867;
  address: any;

  constructor(
    private shopService: ShopsService,
    private geoCodeService: GeocodeService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.setDefaultAddress();
    this.updateResolvedAddress();
  }
  setDefaultAddress() {
    this.address = {
      flatNum: '',
      buildingName: '',
      locality: '',
      city: '',
      state: '',
      pincode: '',
    };
  }

  onSubmit(form) {
    const userLogin = {
      email: this.userService.getUserFromLocalStorage().email,
      password: this.userService.getUserFromLocalStorage().password,
    };
    const shopObject = this.prepareShopObject(form);
    this.shopService.addShop(userLogin, shopObject).subscribe(
      response => {
        this.resetForm(form);
      },
      error => {
        console.error('Some error occurred while processing the request');
      }
    );
  }
  resetForm(form) {
    form.resetForm();
    this.imageUpload = false;
    this.selectedImageUrl = '';
    this.latitude = 17.385;
    this.longitude = 78.4867;
    this.inValidAddress = false;
  }
  onMapClick(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.updateResolvedAddress();
  }
  updateResolvedAddress() {
    this.inValidAddress = false;
    this.loaderForReadOnly = true;
    let latlng: LatLng = {
      latitude: this.latitude,
      longitude: this.longitude,
    };
    this.geoCodeService.resolveAddress(latlng).subscribe(
      address => {
        //Update the form directly from here.
        this.address = {
          flatNum: address.completeAddress.streetNum,
          buildingName: '',
          locality: address.completeAddress.address,
          city: address.completeAddress.city,
          state: address.completeAddress.state,
          pincode: address.completeAddress.pincode,
        };
        this.loaderForReadOnly = false;
      },
      error => {
        this.inValidAddress = true;
        this.loaderForReadOnly = false;

        this.setDefaultAddress();
        console.error(
          'There was some issue in resolving latitude and longitude into address. ' +
            JSON.stringify(error)
        );
      }
    );
  }
  compareTime(startTime, endTime) {
    startTime = startTime.toString().split(' ')[4];
    startTime = Number(startTime.split(':')[0] + startTime.split(':')[1]);

    endTime = endTime.toString().split(' ')[4];
    endTime = Number(endTime.split(':')[0] + endTime.split(':')[1]);
    return startTime < endTime;
  }
  prepareShopObject(formObject) {
    let shopObject = {};
    shopObject['shopName'] = formObject.value.shopName;
    shopObject['shopCategory'] = formObject.value.shopCategory;
    shopObject['shopDescription'] = formObject.value.shopDescription;
    shopObject['startTime'] = formObject.value.startTime
      .toString()
      .split(' ')[4];
    shopObject['endTime'] = formObject.value.endTime.toString().split(' ')[4];
    shopObject['shopAddress'] = this.parseAddress(formObject.value.address);
    shopObject[
      'phoneNumber'
    ] = this.userService.getUserFromLocalStorage().phoneNumber;
    shopObject['latitude'] = this.latitude;
    shopObject['longitude'] = this.longitude;
    shopObject['imageFile'] = this.selectedImageUrl ? this.fileSelected : '';
    return shopObject;
  }
  parseAddress(addressObject) {
    return `${addressObject.flatNum}, ${addressObject.buildingName}, ${
      addressObject.locality
    }, ${addressObject.city}. State: ${addressObject.state}. Pin: ${
      addressObject.pincode
    }`;
  }
  onImageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileSelected = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUpload = true;
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(this.fileSelected);
    }
  }
}
