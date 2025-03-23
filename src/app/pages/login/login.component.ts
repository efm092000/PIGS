import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) { }

  login(){}
  access() {
    // Implement login logic here
    // For now, just navigate to the homepage
    this.router.navigate(['/homepage']);
  }

  register() {
    // Navigate to the register page
    this.router.navigate(['/register']);
  }
}