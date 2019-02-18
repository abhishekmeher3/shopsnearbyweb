import { Component, OnInit } from '@angular/core';
import { Shop, ShopOwner } from 'src/core/models/shop.model';
import { ShopsService } from '../../core/services/shops.service';
import { UserLogin, LatLng, ResolvedAddress, HeaderPath } from 'src/core/models/Models';
import { UserService } from 'src/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { GeocodeService } from 'src/core/services/geocode.service';

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  styleUrls: ['./filters-page.component.css', '../app.component.css'],
})
export class FiltersPageComponent implements OnInit {
  loading: boolean = false;
  currentLocation: string;
  currentLatlng: LatLng;
  shops: Shop[] = [];
  selectedCategories: string[] = [];

  categories: string[] = [];
  distances: number[] = [2, 4, 6, 8, 10, 20, 100];
  selectedDistance: number = 8;
  searchTerm: string ;
  paths: HeaderPath[] = []
  constructor(
    private shopsService: ShopsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private geocodeService: GeocodeService
  ) {

    this.currentLatlng = this.geocodeService.getSavedLocation().latlng
    this.currentLocation = this.geocodeService.getSavedLocation().formattedAddress
  }

  ngOnInit() {
    this.loading = true;
    this.paths.push({display: "Home", path: "/home"})
    this.paths.push({display: "Categories", path: "/filters"})
    this.shopsService.getCategoryList().subscribe(categories => {
      this.categories = categories;
      this.selectedCategories = JSON.parse(JSON.stringify(categories));      
      let searchParam = this.route.snapshot.queryParams.q
      let categoryParam = this.route.snapshot.queryParams.category
      if (searchParam) {
        this.searchTerm = this.route.snapshot.queryParams.q
        this.paths.push({display: "Search", path: "/filters"})
        this.onSearchClicked(searchParam)
      } else if (categoryParam){
        this.selectedCategories = []
        this.selectedCategories.push(categoryParam)
        this.paths.push({display: categoryParam, path: `/filters?category=${categoryParam}`})
        this.updateShops()
      }else {
        this.updateShops()
      }
    });
  }

  onChipRemoveClicked(i: string) {
    let index = this.selectedCategories.indexOf(i);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    }
    this.updateShops();
  }

  private updateShops() {
    this.loading = true;
    const userLogin = {
      email: this.userService.getUserFromLocalStorage().email,
      password: this.userService.getUserFromLocalStorage().password,
    };
    this.searchTerm = null;
    this.shopsService
      .getRecommendedAndOtherShops(
        userLogin,
        this.selectedCategories,
        this.geocodeService.getSavedLocation().latlng,
        this.selectedDistance
      )
      .subscribe(shops => {
        this.shops = shops;
        this.loading = false;
      });
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
    this.updateShops();
  }

  onDistanceSelectionChanged(distance: number) {
    this.selectedDistance = distance;
    this.updateShops();
  }

  onSearchClicked(searchTerm) {
    this.loading = true;
    const userLogin = {
      email: this.userService.getUserFromLocalStorage().email,
      password: this.userService.getUserFromLocalStorage().password,
    };
    this.shopsService
      .searchShops(
        searchTerm,
        userLogin
      )
      .subscribe(shops => {
        this.shops = shops;
        this.loading = false;
      });
  }

  onLocationChanged(address: ResolvedAddress){
    this.updateShops()
    this.currentLocation = address.formattedAddress
  }
}
