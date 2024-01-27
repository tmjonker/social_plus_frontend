import { UserGeneratorService } from './../services/user-generator.service';
import { SavedUser } from './../interfaces/saved-user';
import { SignOutService } from './../services/sign-out.service';
import { InboxService } from './../services/inbox.service';
import { Router } from '@angular/router';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Pages } from '../interfaces/pages';
import { Dropdown } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { UpdateService } from '../services/update.service';
import { SendMessageService } from '../services/send-message.service';

@Component({
  selector: 'app-navbar-signed-in',
  templateUrl: './navbar-signed-in.component.html',
  styleUrls: ['./navbar-signed-in.component.css'],
})
export class NavbarSignedInComponent implements OnInit, AfterViewInit {
  pages!: Pages;
  user!: SavedUser;
  firstName!: string;
  lastName!: string;
  recipient!: string;
  subject!: string;
  body!: string;

  constructor(
    private router: Router,
    public inboxService: InboxService,
    private signOutService: SignOutService,
    private userGenerator: UserGeneratorService,
    private updateService: UpdateService,
    private sendMessageService: SendMessageService
  ) {}

  ngOnInit(): void {
    document.getElementById('pi-link')!.onclick = (e) => e.preventDefault();
    document.getElementById('pw-link')!.onclick = (e) => e.preventDefault();
    document.getElementById('dm-link')!.onclick = (e) => e.preventDefault();
  }

  ngAfterViewInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.firstName = this.user !== undefined ? this.user.firstName! : '';
    this.lastName= this.user !== undefined ? this.user.lastName! : '';
  }

  loadUser(): boolean {
    this.user = JSON.parse(localStorage.getItem('user')!);

    if (this.user !== null) {
      console.log(this.user);
      return true;
    }
    this.user = this.userGenerator.returnEmptySavedUser();
    return false;
  }

  handleSignOut() {
    this.signOutService.performSignOut();
  }
  // NEXT
  handleUpdateInfoSubmit() {
    console.log(this.firstName);
    this.updateService.updateUserInformation(
      this.user.username === undefined ? '' : this.user.username,
      this.firstName,
      this.lastName
    );
  }

  handleUpdatePasswordSubmit() {
    console.log(this.firstName);
    this.updateService.updateUserInformation(
      this.user.username === undefined ? '' : this.user.username,
      this.firstName,
      this.lastName
    );
  }

  handleSendMessageSubmit() {
    console.log(this.firstName);
    this.sendMessageService.sendMessage(
      this.user.username === undefined ? '' : this.user.username,
      this.recipient,
      this.subject,
      this.body
    );
  }

  setNameFields() {
    this.firstName = this.user.firstName!;
    this.lastName = this.user.lastName!;
  }

  async getInboxCount() {
    return await this.inboxService
      .getMessagesReceived()
      .then((success) => {
        this.inboxService.count = success.length;
      })
      .catch((error) => {
        this.handleSignOut();
      });
  }
}
