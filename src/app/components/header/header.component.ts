import {Component, OnInit, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {HeaderService} from './header.service';

@Component({
  selector: 'shopsnearby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchTerm = '';
  resize$ = new Subject<void>();
  targetDevice: string;
  content: any;
  @Input() route;
  @Input() currentLocation;
  constructor(private headerService: HeaderService, private router: Router) {}
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
    this.content = this.headerService.getContent(this.route);
    this.setDeviceViewport();
    this.resize$.pipe(debounceTime(250)).subscribe(x => {
      this.setDeviceViewport();
    });
  }
  onSearchClicked() {
    if (this.searchTerm) {
      this.router.navigate(['/filters'], {queryParams: {q: this.searchTerm}});
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }
}