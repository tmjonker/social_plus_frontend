import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pages } from '../interfaces/pages';

@Component({
  selector: 'app-navbar-signed-in',
  templateUrl: './navbar-signed-in.component.html',
  styleUrls: ['./navbar-signed-in.component.css']
})
export class NavbarSignedInComponent implements OnDestroy, OnInit {

  pages!: Pages;

  constructor() {
    this.pages = JSON.parse(sessionStorage.getItem('pages')!);

    console.log(this.pages);
    if (this.pages === null) {
      this.pages = {
        signIn: true,
        register: false,
        about: false,
      };
    } else {
      this.pages = {
        signIn: this.pages.signIn,
        register: this.pages.register,
        about: this.pages.about,
      };
    }
  }
  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    sessionStorage.setItem('pages', JSON.stringify(this.pages));
  }

  toggleRegister() {
    this.pages = {
      signIn: false,
      register: true,
      about: false,
    };
  }

  toggleAbout() {
    this.pages = {
      signIn: false,
      register: false,
      about: true,
    };
  }

  toggleSignIn() {
    this.pages = {
      signIn: true,
      register: false,
      about: false,
    };
  }
}
