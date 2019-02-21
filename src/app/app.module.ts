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
import {ShopDetailsModule} from './shop-details/shop-details.module';
import {SharedServiceModule} from './service/shared-service.module';
import {FileUploadTriggerDirective} from './add-shop/file-upload.directive';
import {AgmCoreModule} from '@agm/core';
import {ComponentsModule} from './components/components.module';
import {SelectLocationDialogComponent} from './select-location-dialog/select-location-dialog.component';
import {PlacesAutocompleteDirective} from './places-autocomplete-directive/places-autocomplete.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    loginComponent,
    AddShop,
    InfoDialogComponent,
    FiltersPageComponent,
    FileUploadTriggerDirective,
    SelectLocationDialogComponent,
    PlacesAutocompleteDirective,
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
    ShopDetailsModule,
    ComponentsModule,
    SharedServiceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDztFmS-D98D67YHhqXvgBKFeMgLkCS4GA',
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent, SelectLocationDialogComponent],
})
export class AppModule {}
