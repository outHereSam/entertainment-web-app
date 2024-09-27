import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.checkPasswordsMatch }
  );

  checkPasswordsMatch(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password !== confirmPassword) {
      return { notMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      console.log(this.signupForm.errors);
      this.signupForm.markAllAsTouched();
    }
  }
}
