import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  test: string;
  currentLocation: string = 'Banjara hills';
  loading: boolean = false;

  ngOnInit() {
    this.test = 'Home page..';
  }
}
