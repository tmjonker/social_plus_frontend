import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserUpdates } from '../interfaces/user-updates';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
// NEXT
export class UpdateService {

  userUpdates!: UserUpdates;

  constructor(private router: Router) {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
   }

  updateUserInformation(un: string, fn: string, ln: string) {
    console.log(fn);
    this.userUpdates = {
      username: un,
      firstName: fn,
      lastName: ln,
      image: ''
    }

    this.postUpdates();
  }

  postUpdates() {
    axios
    .post('http://localhost:8080/update', JSON.stringify(this.userUpdates), {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("token")!).token
      }
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigateByUrl("/(signedIn:member-home)");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }
}
