import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CommonButtonComponent,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // ICONS
  faArrowLeft = faArrowLeft;

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.email && this.password) {
      this.authService
        .register(this.email, this.password)
        .then((userCredential) => {
          console.log('User registered:', userCredential);
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Registration failed:', error);
        });
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
