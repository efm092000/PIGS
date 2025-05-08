import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    CommonButtonComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  //ICONS
  faArrowLeft = faArrowLeft;

  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    const returnUrl = localStorage.getItem('returnUrl') || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }

  login() {
    if (this.email && this.password) {
      this.authService
        .login(this.email, this.password)
        .then(() => this.router.navigate(['/home']))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Login failed:', error);
        });
    } else {
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
