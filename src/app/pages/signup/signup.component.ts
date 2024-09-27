import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.checkPasswordsMatch }
  );

  checkPasswordsMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      const signupData = { email, password };
      this.authService.signupUser(signupData).subscribe({
        next: (response) => {
          console.log('Response from sign up:', response);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.log('Error from sign up:', error);
        },
      });
    } else {
      console.log(this.signupForm.errors);
      this.signupForm.markAllAsTouched();
    }
  }
}
