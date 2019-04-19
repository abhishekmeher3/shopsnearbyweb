import {HomePageComponent} from './home-page.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';
import {ComponentsModule} from '../components/components.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [HomePageComponent],
})
export class HomeModule {}
