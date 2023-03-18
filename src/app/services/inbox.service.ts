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
   }

   private inboxCount!: number;

   async getMessagesReceived(): Promise<MessageReceived[]> {

    let username;
    if (localStorage.getItem("user") !== null) {
      username = JSON.parse(localStorage.getItem("user")!).username;
    }

    if (username !== undefined) {
    return await axios
      .get('http://localhost:8080/direct-message/' + username, {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem("token")!).token
        }
      })
      .then((response) => {
        return Promise.resolve(response.data);
      }).catch((error) => {
        console.log(error);
        return Promise.reject([]);
      });
    }

    return Promise.reject([]);
   }

  setInboxCount() {

    this.getMessagesReceived().then((success) => {
      this.count = success.length;
    })
   }

   set count(val: number) {
    this.inboxCount = val;
   }

   get count(): number {
    return this.inboxCount
   }
}
