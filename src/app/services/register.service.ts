import { Username } from './../interfaces/username';
import { Email } from './../interfaces/email';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  postRegistration(user: User) {
    axios
      .post('http://localhost:8080/register', JSON.stringify(user))
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigateByUrl('/member-home');
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async postEmailCheckExists(email: Email): Promise<boolean> {
    return await axios
      .post('http://localhost:8080/email', JSON.stringify(email))
      .then((response) => {
        return Promise.resolve(false);
      })
      .catch(async (error) => {
        return Promise.resolve(true);
      });
  }

  async postUsernameCheckExists(username: Username): Promise<boolean> {
    return await axios
      .post('http://localhost:8080/username', JSON.stringify(username))
      .then((response) => {
        return Promise.resolve(false);
      })
      .catch(async (error) => {
        return Promise.resolve(true);
      });
  }
}
