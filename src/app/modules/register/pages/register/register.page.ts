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
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.page.html',
  styleUrls: ['../../../login/pages/login/login.page.scss'],
})
export class RegisterPageComponent {
  readonly showError$: Observable<{ message: string }>;

  registerForm: FormGroup;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly showErrorSubject = new BehaviorSubject({ message: '' });

  constructor() {
    this.showError$ = this.showErrorSubject.asObservable();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(LOGIN_REGEX)]],
    });
  }

  async register() {
    this.showErrorSubject.next({ message: '' });
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    try {
      await this.authService.register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['name'].value
      );
    } catch (err) {
      const errorMessage = (err as Error).message.includes('already exists')
        ? 'Uporabnik s tem email naslovom že obstaja. Poskusite ponovno.'
        : 'Prišlo je do napake. Poskusite ponovno.';
      this.showErrorSubject.next({ message: errorMessage });
    }
  }
}
