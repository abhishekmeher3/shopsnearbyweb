import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {loginComponent} from './login/login.component';
import { AddShop } from './AddShop/add-shop.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: loginComponent},
  {path: 'signup', component: SignupComponent},
  {path:'addShop',component:AddShop}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
