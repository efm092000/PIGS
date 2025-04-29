import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // Lógica de inicio de sesión
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/']); // Navega a la página de inicio
  }
}
