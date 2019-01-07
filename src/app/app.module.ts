import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {loginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AddShop} from './add-shop/add-shop.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {FiltersPageComponent} from './filters-page/filters-page.component';
import {HomeModule} from './home-page/home-page.module';
import {SharedServiceModule} from './service/shared-service.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    loginComponent,
    AddShop,
    InfoDialogComponent,
    FiltersPageComponent,
  ],
  imports: [
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    HomeModule,
    SharedServiceModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent],
})
export class AppModule {}
