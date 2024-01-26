import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserUpdates } from '../interfaces/user-updates';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// NEXT
export class UpdateService {

  userUpdates!: UserUpdates;

  constructor(private router: Router) { }

  updateUserInformation(firstName: string, lastName: string) {
    this.userUpdates.firstName = firstName;
    this.userUpdates.lastName = lastName;
  }

  postUpdates() {
    axios
    .post('http://localhost:8080/api/update', JSON.stringify(this.userUpdates))
    .then((response) => {
      console.log(response);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigateByUrl("/(signedIn:member-home)");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }
}
