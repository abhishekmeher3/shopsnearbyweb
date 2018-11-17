import { Component, OnInit } from '@angular/core'
import { UserService } from '../../core/services/user.service'
import { User } from '../../core/models/user.model'
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { ResolvedAddress, LatLng } from 'src/core/models/Models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  userTypes = [{ display: "User", data: "user" }, { display: "Shop Owner", data: "shopOwner" }, { display: "Agent", data: "agent" }]
  email: string
  phonenum: number
  firstName: string
  lastName: string
  selectedUserType: any = this.userTypes[0].data
  currentLatLng: LatLng
  currentResolvedAddress: ResolvedAddress
  locationError: any


  loading = false

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userService.resolveAddress({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }).subscribe(
          resolvedAddress => this.currentResolvedAddress = resolvedAddress,
          error => this.locationError = error
        )
      },
      error => this.locationError = { message: "location fetching not working" },
      { timeout: 10000 }
    )
  }

  //21.4976558 lat
  // long 83.8867855
  signup() {
    this.loading = true
    if (!this.currentResolvedAddress) {
      this.getLocation()
      setTimeout(this.checkLocationStuffDone.bind(this), 5000)
    } else this.signup0()
  }

  checkLocationStuffDone() {
    if (this.currentResolvedAddress || this.locationError) this.signup0()
    else setTimeout(this.checkLocationStuffDone.bind(this), 2000)
  }

  signup0() {
    let validationResult = this.validate()
    if (validationResult.status === true) {
      let user: User = this.getUserObject()
      this.userService.signup(user).subscribe(result => {
        console.log(result);
        this.showDialog("Signup successfull", result.message)
        this.loading = false
      }, error => {
        console.log(error)
        this.showDialog("Signup Error:", error.error.message)
        this.loading = false
      })
    } else {
      this.showDialog("Validation Error", validationResult.message)
      this.loading = false
    }
  }


  getUserObject(): User {
    let address = "Hyderabad"
    let laititude = 17.3850
    let longitude = 78.4867

    if (this.currentResolvedAddress) {
      address = this.currentResolvedAddress.formattedAddress
      laititude = this.currentResolvedAddress.latlng.latitude
      longitude = this.currentResolvedAddress.latlng.longitude
    }

    let user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phonenum.toString(),
      type: this.selectedUserType,
      address: address,
      latitude: laititude,
      longitude: longitude,
      id: null,
      active: null,
      imageUrl: null,
      extraData: null
    }
    return user
  }
  validate(): any {
    if (!this.firstName) return { status: false, message: "First name cannot be empty" }
    if (!this.lastName) return { status: false, message: "Last name cannot be empty" }
    if (!this.email) return { status: false, message: "Email cannot be empty" }
    if (!this.phonenum) return { status: false, message: "Phone Number cannot be empty" }
    return { status: true }
  }

  showDialog(title: string, message: string) {
    let dialogRef = this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  compareUserType(item1, item2) {
    return item1.data == item2.data;
  }




  signupy() {
    navigator.geolocation.getCurrentPosition((position) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            let validationResult = this.validate()
            if (validationResult.status === true) {
              let user: User = this.getUserObject()
              this.userService.signup(user).subscribe(result => {
                console.log("userserice")
                console.log(result);
                this.dialog.open(InfoDialogComponent, {
                  data: { title: "Signup Done", message: result.message }
                });
              }, error => {
                this.dialog.open(InfoDialogComponent, {
                  data: { title: "Signup Error:", message: error.error + ", " + error.error.error }
                })
              })
            } else {
              //validation failed
            }
            //element.text(results[1].formatted_address);
          } else {
            //element.text('Location not found');
          }
        } else {
          //element.text('Geocoder failed due to: ' + status);
        }
      });
    }, error => {
      console.log(error);
    }, {
        timeout: 10000
      }
    );
  }
}
