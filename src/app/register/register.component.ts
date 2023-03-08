import { User } from './../interfaces/user';
import { RegisterServiceService } from './../services/register-service.service';
import { Component, OnInit } from '@angular/core';
import { InputValidatorService } from '../services/input-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validatorService: InputValidatorService;
  registerService: RegisterServiceService;

  user!: User;

  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;

  constructor() {
    this.validatorService = new InputValidatorService();
    this.registerService = new RegisterServiceService();
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

  handleSubmit() {

    this.user = {
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password1: this.password1,
      password2: this.password2,
    };

    console.log('In handleSubmit');

    if (this.testPasswords() && this.testEmail() && this.testUsername()) {
      this.registerService.postRegistration(this.user);
    } else {
      //display modal indicating errors.
    }
  }
}
