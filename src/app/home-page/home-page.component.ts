import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  test: string;

  ngOnInit() {
    this.test = 'Home page..';
  }
}
