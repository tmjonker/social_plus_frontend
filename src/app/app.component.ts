import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    
  }
  user = localStorage.getItem("sm-user");

  userIsNull() {
    return this.user === null;
  }
}
