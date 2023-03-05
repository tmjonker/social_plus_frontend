import { Component, OnInit } from '@angular/core';
import { InputValidatorService } from '../services/input-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  validatorService: InputValidatorService;

  email!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;

  constructor() {
    this.validatorService = new InputValidatorService();
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
        this.validatorService.validateTotalPassword(this.password2)
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

  handleSubmit() {
    if (this.testPasswords() && this.testEmail()) {
      //send data to backend.
    } else {
      //display modal indicating errors.
    }
  }
}
