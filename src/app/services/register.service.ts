import { User } from '../interfaces/user';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  postRegistration(user: User) {

    axios
      .post('http://localhost:8080/register', JSON.stringify(user))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
}
