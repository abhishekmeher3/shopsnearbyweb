import {ShopDetailsComponent} from './shop-details.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  declarations: [ShopDetailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [ShopDetailsComponent],
})
export class ShopDetailsModule {}
