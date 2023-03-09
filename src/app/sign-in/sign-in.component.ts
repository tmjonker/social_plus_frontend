import { Credentials } from './../interfaces/credentials';
import { SignInService } from './../services/sign-in.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  email!: string;
  password!: string;
  credentials!: Credentials;

  constructor(private signInService: SignInService, private router: Router) {
  }

  ngOnInit(): void {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (localStorage.getItem("user")) {
      this.router.navigateByUrl("/member-home");
    }
  }

  handleSubmit() {
    this.credentials = {
      email: this.email,
      password: this.password,
    };

    this.signInService.postSignIn(this.credentials);
  }
}
