import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (this.email && this.password) {
      this.authService
        .login(this.email, this.password)
        .then((userCredential) => {
          console.log('User logged in:', userCredential);
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Login failed:', error);
        });
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
