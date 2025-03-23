import { Component, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user = signal<User | null>(null);
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.user.set(user);
    });
  }

  login() {
    this.authService
      .login(this.email, this.password)
      .then(() => {
        console.log('User logged in');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  register() {
    console.log('El email es: ' + this.email);
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService
      .register(this.email, this.password)
      .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        this.errorMessage = ''; // Clear error message on successful registration
      })
      .catch((error) => {
        this.errorMessage = error.message; // Display any error messages
        console.error('Registration error:', error);
      });
  }
}
