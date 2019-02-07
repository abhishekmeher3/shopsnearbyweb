import {
  Component,
  OnInit,
  HostListener,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
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
  @Output() onSearchPress: EventEmitter<any> = new EventEmitter<any>();
  resize$ = new Subject<void>();
  targetDevice: string;
  content: any;
  @Input() route;
  @Input() currentLocation;
  constructor(private headerService: HeaderService) {}
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
    this.onSearchPress.emit(this.searchTerm);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }
}
