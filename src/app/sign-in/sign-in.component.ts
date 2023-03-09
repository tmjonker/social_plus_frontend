import { Credentials } from './../interfaces/credentials';
import { SignInService } from './../services/sign-in.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  email!: string;
  password!: string;
  credentials!: Credentials;

  constructor(private signInService: SignInService, private router: Router) {

    if (localStorage.getItem("user")) {
      this.router.navigateByUrl("/memberHome");
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
