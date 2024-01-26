import { UserGeneratorService } from './../services/user-generator.service';
import { SavedUser } from './../interfaces/saved-user';
import { SignOutService } from './../services/sign-out.service';
import { InboxService } from './../services/inbox.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pages } from '../interfaces/pages';
import { Dropdown } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-navbar-signed-in',
  templateUrl: './navbar-signed-in.component.html',
  styleUrls: ['./navbar-signed-in.component.css'],
})
export class NavbarSignedInComponent implements OnInit {
  pages!: Pages;
  user!: SavedUser;
  firstName!: string;
  lastName!: string;

  constructor(
    private router: Router,
    public inboxService: InboxService,
    private signOutService: SignOutService,
    private userGenerator: UserGeneratorService,
    private updateService: UpdateService
  ) {}

  ngOnInit(): void {
    document.getElementById('pi-link')!.onclick = (e) => e.preventDefault();
    document.getElementById('pw-link')!.onclick = (e) => e.preventDefault();
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
  handleUpdateSubmit() {
    this.updateService.updateUserInformation(this.firstName, this.lastName);
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
