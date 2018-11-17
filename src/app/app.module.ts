import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { loginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { AddShop } from './AddShop/add-shop.component';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatButtonModule, MatProgressBarModule} from '@angular/material';
import { InfoDialogComponent } from './info-dialog/info-dialog.component'
>>>>>>> b2f5a27f41822bef645ba7f5864269c29f4553be

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    loginComponent,
<<<<<<< HEAD
    AddShop,
=======
    InfoDialogComponent,
>>>>>>> b2f5a27f41822bef645ba7f5864269c29f4553be
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
