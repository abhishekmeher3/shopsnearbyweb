import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-AddShop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss'],
})
export class AddShop implements OnInit {
  categories = ['Toys', 'Automobile', 'Electricity'];
  timeComparisonFlag = false;
  constructor() {}

  ngOnInit() {}
  onSubmit(form) {
    console.log(form);
    console.log('Successfully submitted the form.');
    //Post the form and reset it by calling form.resetForm();
  }
  compareTime(startTime, endTime) {
    return startTime < endTime;
  }
}
