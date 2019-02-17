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
  constructor(
    private geocodeService: GeocodeService    
  ) { }

  ngOnInit() {
  }

  addressSelected(address){
      this.address = {
        latlng: {
          latitude: address.geometry.location.lat(),
          longitude: address.geometry.location.lng()
        },
        formattedAddress: address.formatted_address,
        completeAddress: this.geocodeService.parseCompleteAddress(address.address_components)
      }
  }

}
