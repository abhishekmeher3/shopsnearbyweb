import {HomePageComponent} from './home-page.component';
import {NgModule} from '@angular/core';
import {
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  declarations: [HomePageComponent],
  imports: [MatDialogModule, MatButtonModule, MatProgressBarModule],
  providers: [],
  bootstrap: [HomePageComponent],
})
export class HomeModule {}
