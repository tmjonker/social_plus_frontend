import { Username } from './../interfaces/username';
import { Email } from './../interfaces/email';
import { User } from './../interfaces/user';
import { RegisterService } from '../services/register.service';
import {
  AfterContentChecked,
  Component,
  OnInit,
  AfterViewChecked,
} from '@angular/core';
import { InputValidatorService } from '../services/input-validator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewChecked {
  user!: User;

  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;

  emailObject!: Email;
  usernameObject!: Username;

  emailExists: boolean = false;
  usernameExists: boolean = false;

  constructor(
    private validatorService: InputValidatorService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewChecked(): void {
    this.emailObject = {
      email: this.email.trim().toLowerCase()
    }

    this.usernameObject = {
      username: this.username.trim().toLowerCase()
    }
  }

  testEmail() {
    if (this.email !== null)
      return this.validatorService.validateEmail(this.email);

    return false;
  }

  testPasswords() {
    if (this.password1 !== null && this.password2 !== null) {
      return (
        this.validatorService.validateTotalPassword(this.password1) &&
        this.validatorService.validateTotalPassword(this.password2) &&
        this.testMatch()
      );
    }

    return false;
  }

  testLength(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validatePasswordLength(this.password1);
  }

  testUpper(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validateUpperCase(this.password1);
  }

  testLower(): boolean {
    if (this.password1 === undefined) {
      return false;
    }
    return this.validatorService.validateLowerCase(this.password1);
  }

  testMatch(): boolean {
    if (
      this.password1 === undefined ||
      this.password2 === undefined ||
      this.password1 === '' ||
      this.password2 === ''
    ) {
      return false;
    }
    return this.password1 === this.password2;
  }

  testUsername(): boolean {
    if (this.username === undefined) return false;

    return this.validatorService.validateUsername(this.username);
  }

  testDataComplete(): boolean {
    if (
      this.firstName !== '' &&
      this.firstName !== undefined &&
      this.lastName !== '' &&
      this.lastName !== undefined
    ) {
      return this.testPasswords() && this.testEmail() && this.testUsername();
    }

    return false;
  }

  async handleSubmit() {
    this.user = {
      username: this.username.trim().toLowerCase(),
      email: this.email.trim().toLowerCase(),
      firstName: this.firstName.trim().toLowerCase(),
      lastName: this.lastName.trim().toLowerCase(),
      password1: this.password1,
      password2: this.password2
    };

    

    if (this.testPasswords() && this.testEmail() && this.testUsername()) {

      await this.registerService.postEmailCheckExists(this.emailObject).then(boo => {
        this.emailExists = boo;
      });

      await this.registerService.postUsernameCheckExists(this.usernameObject).then(boo => {
        this.usernameExists = boo;
      });
    }

    if (!this.emailExists && !this.usernameExists) {
      this.registerService.postRegistration(this.user);
      this.email = '';
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.password1 = '';
      this.password2 = '';
    }
  }
}
