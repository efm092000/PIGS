import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) { }

  register() {
    // Implement registration logic here
    // For now, just navigate to the homepage
    this.router.navigate(['/homepage']);
  }

  login() {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}