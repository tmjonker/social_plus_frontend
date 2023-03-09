import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Credentials } from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  postSignIn(credentials: Credentials) {

    axios
      .post('http://localhost:8080/authenticate', JSON.stringify(credentials))
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.router.navigateByUrl("/memberHome");
      })
      .catch((error) => {
        console.log(error.response.data);
        this.router.navigateByUrl("/signIn");
      });

      return false;
  }
}
