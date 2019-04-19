import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {loginComponent} from './login/login.component';
import {AddShop} from './add-shop/add-shop.component';
import {FiltersPageComponent} from './filters-page/filters-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthenticationGuard} from './service/authentication-guard.service';
import {ShopDetailsComponent} from './shop-details/shop-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'login',
    component: loginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {path: 'addshop', component: AddShop, canActivate: [AuthenticationGuard]},
  {
    path: 'details/:id',
    component: ShopDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'filters',
    component: FiltersPageComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticationGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
