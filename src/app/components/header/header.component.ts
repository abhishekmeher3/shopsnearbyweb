import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {HeaderService} from './header.service';
import {MatDialog} from '@angular/material';
import {SelectLocationDialogComponent} from '../../select-location-dialog/select-location-dialog.component';
import {GeocodeService} from 'src/core/services/geocode.service';
import {UserService} from 'src/core/services/user.service';
import { HeaderPath } from 'src/core/models/Models';
@Component({
  selector: 'shopsnearby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() shopDetails;
  @Input() searchTerm = '';
  resize$ = new Subject<void>();
  targetDevice: string;
  content: any;
  @Input() route;
  @Input() currentLocation;
  @Output() onSearchClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLocationChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() paths: HeaderPath[] = []
  constructor(
    private headerService: HeaderService,
    public dialog: MatDialog,
    private geocodeService: GeocodeService,
    private userService: UserService
  ) {}
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
  ngOnChanges(changes: SimpleChanges): void {
    if (this.route === 'shop-details' && changes.shopDetails.currentValue) {
      this.shopDetails = changes.shopDetails.currentValue;
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
      this.onSearchClick.emit(this.searchTerm);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }

  onLocationClicked() {
    const dialogref = this.dialog.open(SelectLocationDialogComponent, {});
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.geocodeService.saveLocation(result);
        this.onLocationChanged.emit(result);
      }
    });
  }
}
