import {Component, OnInit} from '@angular/core';
import {Shop, ShopOwner} from 'src/core/models/shop.model';
import {ShopsService} from '../../core/services/shops.service';
import {UserLogin} from 'src/core/models/Models';

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  styleUrls: ['./filters-page.component.css', '../app.component.css'],
})
export class FiltersPageComponent implements OnInit {
  testShops = [
    {
      id: 14,
      name: null,
      category: null,
      description: null,
      phoneNumber: null,
      timeFrom: null,
      timeTo: null,
      address: null,
      latitude: 0,
      longitude: 0,
      isFavourite: false,
      userId: 56,
      rating: null,
      imageUrl: null,
      branchId: '68bf4bd0-d092-11e8-9657-718f91045730',
      active: true,
      shopOwner: null,
    },
    {
      id: 17,
      name: 'saishop',
      category: 'Devices',
      description: 'new device',
      phoneNumber: '9999999999',
      timeFrom: '09:00:00',
      timeTo: '18:00:00',
      address: 'assasddvvvsd',
      latitude: 17.5040028,
      longitude: 78.480933,
      isFavourite: false,
      userId: 56,
      rating: null,
      imageUrl: null,
      branchId: '884d0e70-e5db-11e8-9657-718f91045730',
      active: true,
      shopOwner: null,
    },
    {
      id: 18,
      name: 'saikkk',
      category: 'Devices',
      description: 'hihihih',
      phoneNumber: '9999999999',
      timeFrom: '09:00:00',
      timeTo: '20:00:00',
      address: 'mommm',
      latitude: 17.5040028,
      longitude: 78.480933,
      isFavourite: false,
      userId: 56,
      rating: null,
      imageUrl: null,
      branchId: 'f19db310-e5dc-11e8-9657-718f91045730',
      active: true,
      shopOwner: null,
    },
    {
      id: 16,
      name: null,
      category: null,
      description: null,
      phoneNumber: null,
      timeFrom: null,
      timeTo: null,
      address: null,
      latitude: 0,
      longitude: 0,
      isFavourite: false,
      userId: 31,
      rating: null,
      imageUrl: null,
      branchId: 'bc5adae0-d4ff-11e8-9657-718f91045730',
      active: false,
      shopOwner: null,
    },
    {
      id: 15,
      name: 'Sambasiva Raoo',
      category: 'Internet',
      description: 'ss internet ',
      phoneNumber: '9999999999',
      timeFrom: '08:00:00',
      timeTo: '19:01:00',
      address: 'asasadsfseresrrwar',
      latitude: 17.385044,
      longitude: 78.486671,
      isFavourite: false,
      userId: 56,
      rating: null,
      imageUrl: null,
      branchId: 'fcc2af20-d092-11e8-9657-718f91045730',
      active: true,
      shopOwner: null,
    },
    {
      id: 11,
      name: 'Divine Astrological Research Institute',
      category: 'Office and Services',
      description:
        'KP Astrology - Prediction Reports, Training, Astrology Software',
      phoneNumber: '9701924365',
      timeFrom: '10:00:00',
      timeTo: '22:00:00',
      address:
        '{"address":"G-1908, Rainbow Vistas @ Rock Garden, Green Hills Road, Kukatpally , Hyderabad, Telangana, India, 500018","building":"Rainbow Vistas @ Rock Garden","city":"Hyderabad","country":"India","houseNumber":"G-1908","locality":"Green Hills Road, Kukatpally ","pincode":"500018","state":"Telangana"}',
      latitude: 17.4683596273625,
      longitude: 78.40787954628468,
      isFavourite: false,
      userId: 35,
      rating: null,
      imageUrl: 'http://122.175.60.20:8104/uploads/35-1536861387570.jpg',
      branchId: '563f6e40-b77e-11e8-8139-f3d0028f5a65',
      active: true,
      shopOwner: {
        ownerEmail: 'msrao.dari@gmail.com',
        ownerLastName: 'M',
        ownerName: 'Sambasiva Rao',
        ownerPhoneNum: '9701924365',
        website: 'www.himajainfotech.com ',
      },
    },
    {
      id: 9,
      name: 'Himaja Infotech Private Limited Branch Office ',
      category: 'Office and Services',
      description: 'IT Services- Android and iOS apps developers',
      phoneNumber: '9949628489',
      timeFrom: '10:00:00',
      timeTo: '22:00:00',
      address:
        '{"address":"G-1908, Rainbow Vistas @ Rock Garden , Green Hills Road, Kukatpally , Hyderabad, Telangana, India, 500018","building":"Rainbow Vistas @ Rock Garden ","city":"Hyderabad","country":"India","houseNumber":"G-1908","locality":"Green Hills Road, Kukatpally ","pincode":"500018","state":"Telangana"}',
      latitude: 17.468380095467072,
      longitude: 78.40800259262323,
      isFavourite: false,
      userId: 35,
      rating: null,
      imageUrl: 'http://122.175.60.20:8104/uploads/35-1536844258219.jpg',
      branchId: '745d4460-b756-11e8-9664-959f80547df2',
      active: true,
      shopOwner: {
        ownerEmail: 'msrao.dari@gmail.com',
        ownerLastName: 'M',
        ownerName: 'Sambasiva Raoo',
        ownerPhoneNum: '9949628489',
        website: 'www.himajainfotech.com ',
      },
    },
  ];

  loading: boolean = false;
  currentLocation: string = 'Banjara hills something something something';
  shops: Shop[] = [];
  selectedCategories: string[] = [];

  categories: string[] = [
    'Electronics',
    'Hospitals',
    'Category 3',
    'Category 4',
    'Category 5',
  ];
  distances: number[] = [2, 4, 6, 8, 10];
  selectedDistance: number = 8;
  constructor(private shopsService: ShopsService) {
    this.loading = true;
    let userloging: UserLogin = {
      email: 'abhishekmeher3@gmail.com',
      password: 'KtKiLa',
    };
    this.shopsService.getNearByShops(userloging).subscribe(
      shops => {
        this.shops = shops;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
    this.shops = this.testShops;
  }

  ngOnInit() {}

  onChipRemoveClicked(i: string) {
    let index = this.selectedCategories.indexOf(i);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    }
  }

  updateCategorySelection(category: string, event) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      let index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  onDistanceSelectionChanged(distance: number) {
    this.selectedDistance = distance;
  }

  onSearchClicked(term: String) {}
}
