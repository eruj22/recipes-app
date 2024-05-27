import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOGIN_REGEX } from 'src/app/shared/constants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPageComponent {
  readonly showError$: Observable<{ message: string }>;
  readonly loginForm: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly showErrorSubject = new BehaviorSubject({ message: '' });

  constructor() {
    this.showError$ = this.showErrorSubject.asObservable();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(LOGIN_REGEX)]],
    });
  }

  async login() {
    this.showErrorSubject.next({ message: '' });
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    try {
      await this.authService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );
    } catch (err) {
      const errorMessage = (err as Error).message.includes(
        'Invalid credentials'
      )
        ? 'Nepravilni email ali geslo. Poskusite ponovno.'
        : 'Prišlo je do napake. Poskusite ponovno.';
      this.showErrorSubject.next({ message: errorMessage });
    }
  }
}
