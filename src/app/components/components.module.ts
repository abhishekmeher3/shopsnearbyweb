import {HeaderComponent} from './header/header.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [HeaderComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
