import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ResolvedAddress } from 'src/core/models/Models';
import { GeocodeService } from 'src/core/services/geocode.service';

@Component({
  selector: 'app-select-location-dialog',
  templateUrl: './select-location-dialog.component.html',
  styleUrls: ['./select-location-dialog.component.css']
})
export class SelectLocationDialogComponent implements OnInit {

  address: ResolvedAddress
  placesText: string
  loading:boolean = false
  constructor(
    private geocodeService: GeocodeService
  ) {

  }

  ngOnInit() {
  }

  addressSelected(address) {
    this.address = {
      latlng: {
        latitude: address.geometry.location.lat(),
        longitude: address.geometry.location.lng()
      },
      formattedAddress: address.formatted_address,
      completeAddress: this.geocodeService.parseCompleteAddress(address.address_components)
    }
  }

  currentLocationClicked() {
    this.loading = true
    this.geocodeService.getLatitudeLongitude(true).then(latlng => {
      this.geocodeService.resolveAddress(latlng).subscribe(address => {
        this.placesText = address.formattedAddress
        this.address = address
        this.loading = false
      }, error=>{this.loading = false})
    }).catch(err=>{this.loading = false})
  }

}
