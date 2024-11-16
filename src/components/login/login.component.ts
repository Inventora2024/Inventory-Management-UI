import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../models/login.model';
import { LoginService } from '../../services/login-service/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Employee', Validators.required], // Default to 'Employee'
      isAdmin: [false], // Checkbox default value
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginRequest = {
        ...this.loginForm.value,
        role: this.loginForm.controls['isAdmin'].value ? 'Admin' : 'Employee',
      };

      this.loginService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          this.loginError = false;
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response));
          this.loginSuccess.emit();
        },
        error: (err) => {
          console.error('Login failed', err);
          this.loginError = true;
        },
      });
    }
  }
}
