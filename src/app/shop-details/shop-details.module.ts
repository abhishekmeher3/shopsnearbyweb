import {ShopDetailsComponent} from './shop-details.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';
import {ComponentsModule} from '../components/components.module';
import {TimeFormat} from './24-12hr.pipe';

@NgModule({
  declarations: [ShopDetailsComponent, TimeFormat],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [ShopDetailsComponent],
})
export class ShopDetailsModule {}
