import {HomePageComponent} from './home-page.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';
import {SlickModule} from 'ngx-slick';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    SlickModule,
  ],
  providers: [],
  bootstrap: [HomePageComponent],
})
export class HomeModule {}
