import {Component} from '@angular/core';
import {ShopsService} from '../../core/services/shops.service';

@Component({
  selector: 'app-AddShop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss'],
})
export class AddShop {
  selectedImageUrl: any = '';
  fileSelected: any;
  imageUpload = false;
  categories = ['Toys', 'Automobile', 'Electricity'];
  constructor(private shopService: ShopsService) {}

  onSubmit(form) {
    const shopObject = this.prepareShopObject(form);
    this.shopService.addShop(shopObject).subscribe(
      response => {
        form.resetForm();
        this.imageUpload = false;
        this.selectedImageUrl = '';
      },
      error => {
        console.error('Some error occurred while processing the request');
      }
    );
  }
  compareTime(startTime, endTime) {
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
