import {HeaderComponent} from './header/header.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {HeaderService} from './header/header.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule],
  providers: [HeaderService],
  bootstrap: [HeaderComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
