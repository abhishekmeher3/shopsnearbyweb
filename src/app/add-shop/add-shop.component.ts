import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-AddShop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css'],
})
export class AddShop implements OnInit {
  categories = [
    {
      name: 'Toys',
    },
    {
      name: 'Automobile',
    },
    {
      name: 'Electricity',
    },
  ];
  selectedValue = this.categories[0];
  constructor() {}

  ngOnInit() {}
}
