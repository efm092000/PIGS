import { Component, signal } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
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