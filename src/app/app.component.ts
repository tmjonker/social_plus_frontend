import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any;

  constructor() {
    this.user = localStorage.getItem("user");
  }

  userIsNull():boolean {

    this.user = localStorage.getItem("user");
    console.log(this.user === undefined || this.user === null);
    return this.user === undefined || this.user === null;
  }
}
