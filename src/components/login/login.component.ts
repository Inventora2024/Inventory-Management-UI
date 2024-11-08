import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false], // Ensure the default value is false
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      console.log(loginData);

      // Simulate an authentication process
      if (
        loginData.email === 'admin@example.com' &&
        loginData.password === 'password' &&
        loginData.isAdmin
      ) {
        // Successful login
        this.loginError = false;
        alert('Login successful!');
      } else {
        // Failed login
        this.loginError = true;
      }
    }
  }
}
