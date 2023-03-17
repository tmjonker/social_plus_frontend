import { Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any;

  constructor(private router: Router) {
    this.user = localStorage.getItem("user");
    if (!this.userIsNull()) {
      this.router.navigateByUrl("/(signedIn:member-home)");
    } else {
      this.router.navigateByUrl("/sign-in");
    }
  }

  userIsNull():boolean {

    this.user = localStorage.getItem("user");
    
    return this.user === undefined || this.user === null;
  }
}
