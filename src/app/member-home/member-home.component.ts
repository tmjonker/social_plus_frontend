import { InboxService } from './../services/inbox.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent {

  user!: any;

  constructor(private inboxService: InboxService) {

    this.loadUser();
    this.inboxService.setInboxCount();
  }

  loadUser(): boolean {
    this.user = JSON.parse(localStorage.getItem("user")!);

    if(this.user !== null)
      return true;

    return false;
  }
}
