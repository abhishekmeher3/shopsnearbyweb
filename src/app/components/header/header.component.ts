import {Component, OnInit, HostListener, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'shopsnearby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  resize$ = new Subject<void>();
  targetDevice: string;
  @Input() route;
  @Input() primaryHeading;
  @Input() secondaryHeading;
  constructor() {}
  setDeviceViewport() {
    if (window.innerWidth < 576) {
      this.targetDevice = 'xs';
    } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
      this.targetDevice = 'sm';
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.targetDevice = 'md';
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      this.targetDevice = 'lg';
    } else {
      this.targetDevice = 'xl';
    }
  }
  ngOnInit() {
    this.setDeviceViewport();
    this.resize$.pipe(debounceTime(250)).subscribe(x => {
      this.setDeviceViewport();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }
}
