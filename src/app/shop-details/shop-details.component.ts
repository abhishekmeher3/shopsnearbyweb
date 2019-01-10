import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'shop-details-page',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  loading: boolean = false;

  constructor() {
    console.log('Inside constructor of details page.');
  }
  ngOnInit() {
    console.log('Inside ngOnInit of details page.');
  }
}
