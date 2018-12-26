import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { loginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddShop } from './AddShop/add-shop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatProgressBarModule} from '@angular/material';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { FiltersPageComponent } from './filters-page/filters-page.component'

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
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoDialogComponent
  ]
})
export class AppModule { }
