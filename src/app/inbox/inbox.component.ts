import { MessageReceived } from './../interfaces/message-received';
import { InboxService } from './../services/inbox.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  messagesReceived!: MessageReceived[];

  constructor(private inboxService: InboxService) {
    this.loadMessagesReceived();
  }

  async loadMessagesReceived() {
    await this.inboxService.getMessagesReceived().then((success) => {
      this.messagesReceived = success as MessageReceived[];
      console.log(this.messagesReceived);
    })
  }
}
