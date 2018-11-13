import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  names = ["User", "Shop Owner", "Agent"]
  email:string
  phonenum:number
  userType = this.names[0]

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  signup(){
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
    });
  }
  signup2() {
    this.userService.login("sainik18@gmailll.com", "ZrLnMk").subscribe(user=>{
      this.email = user.email
      this.phonenum = Number(user.phoneNumber)
    },error=>{      
      this.email = error.error.message
    })
  }
}
