import { Component, OnInit } from '@angular/core';
import { Shop, ShopOwner } from 'src/core/models/shop.model';
import { ShopsService } from '../../core/services/shops.service';
import { UserLogin } from 'src/core/models/Models';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  styleUrls: ['./filters-page.component.css', '../app.component.css'],
})
export class FiltersPageComponent implements OnInit {
  loading: boolean = false;
  currentLocation: string = 'Hyderabad';
  shops: Shop[] = [];
  selectedCategories: string[] = [];

  categories: string[] = [];
  distances: number[] = [2, 4, 6, 8, 10, 20 ,100];
  selectedDistance: number = 8;
  constructor(private shopsService: ShopsService, private userService: UserService) {
    this.loading = true;
    this.shopsService.getCategoryList()
      .subscribe(categories => {
        this.categories = categories
        this.selectedCategories = JSON.parse(JSON.stringify(categories));
        this.updateShops()
      })
  }

  ngOnInit() { }

  onChipRemoveClicked(i: string) {
    let index = this.selectedCategories.indexOf(i);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    }
    this.updateShops()
  }

  private updateShops(){
    this.loading = true;
    const userLogin = {
      email: this.userService.getUserFromLocalStorage().email,
      password: this.userService.getUserFromLocalStorage().password,
    };
    this.shopsService.getRecommendedAndOtherShops(
      userLogin,
      this.selectedCategories,
      null,
      this.selectedDistance
    ).subscribe(shops=>{
      this.shops = shops;
      this.loading = false;
    })
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
    this.updateShops()
  }

  onDistanceSelectionChanged(distance: number) {
    this.selectedDistance = distance;
    this.updateShops()
  }

  onSearchClicked(term: String) { }
}
