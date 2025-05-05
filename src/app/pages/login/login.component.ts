import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/']); // Navega a la página de inicio
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
