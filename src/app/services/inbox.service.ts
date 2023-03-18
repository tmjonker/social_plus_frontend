import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { MessageReceived } from '../interfaces/message-received';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common['SocialPlus'] = environment.apiKey;
    axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("token")!).token;
   }

   async getMessagesReceived(): Promise<MessageReceived[]> {

    let username = JSON.parse(localStorage.getItem("user")!).username;

    console.log(username);

    return await axios
      .get('http://localhost:8080/direct-message/' + username)
      .then((response) => {
        return Promise.resolve(response.data);
      })
   }
}
