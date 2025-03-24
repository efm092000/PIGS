import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
confirmPassword: any;
email: any;
signup() {
throw new Error('Method not implemented.');
}
  datosJson: any;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  //authService = inject(AuthService)
  router = inject(Router);
  loginform = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerform = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;
isLogin = true;
password: any;
rememberMe: any;
username: any;

 

  ngOnInit() {
    // Initialize any necessary data here
  }

  login() {
    const loginElement = document.getElementById('login');
    const registerElement = document.getElementById('register');
    const elegirElement = document.getElementById('elegir');

    if (loginElement && registerElement && elegirElement) {
      loginElement.style.left = '50px';
      registerElement.style.left = '450px';
      elegirElement.style.left = '0px';
    }
  }

  registrar() {
    const loginElement = document.getElementById('login');
    const registerElement = document.getElementById('register');
    const elegirElement = document.getElementById('elegir');

    if (loginElement && registerElement && elegirElement) {
      loginElement.style.left = '-400px';
      registerElement.style.left = '50px';
      elegirElement.style.left = '120px';
    }
  }

  autenticar_usuario() {
    // Implement login logic here
    // For now, just navigate to the homepage
    this.router.navigate(['/homepage']);
  }

  registrar_usuario() {
    // Implement registration logic here
    // For now, just navigate to the homepage
    this.router.navigate(['/homepage']);
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}