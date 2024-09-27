import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      const loginData = { email, password };
      this.authService.loginUser(loginData).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log('Error logging in:', error);
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
