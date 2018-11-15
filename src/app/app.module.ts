import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { loginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddShop } from './AddShop/add-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    loginComponent,
    AddShop,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
