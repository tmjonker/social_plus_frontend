import { Pages } from './../pages';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  pages!: Pages;

  constructor() {
    this.pages = {
      signIn: true,
      register: false,
      about: false,
    }
  }
  
  toggleRegister() {
    this.pages = {
      signIn: false,
      register: true,
      about: false,
    }
  }

  toggleAbout() {
    this.pages = {
      signIn: false,
      register: false,
      about: true,
    }
  }

  toggleSignIn() {
    this.pages = {
      signIn: true,
      register: false,
      about: false,
    }
  }
}
