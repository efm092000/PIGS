import { Component, signal } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user = signal<User | null>(null);
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user: User | null) => {
      this.user.set(user);
    });

  }
  
  login() {
    this.authService.login(this.email, this.password).then(() => {
      console.log('Login successful!');})
    .catch((error) => { 
        console.error('Login failed:', error);
    })
  }
}
