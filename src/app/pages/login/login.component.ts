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
  datosJson: any;
  isLogin: boolean = true; // Variable para alternar entre login y registro
  username: string = '';
  password: string = '';
  email: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = false;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
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



  ngOnInit() {
    // Initialize any necessary data here
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  login() {
    // Implement login logic here
    // For now, just navigate to the homepage
    //this.router.navigate(['/homepage']);
  }

  signup() {
    // Implement registration logic here
    // For now, just navigate to the homepage
    this.router.navigate(['/signup']);
  }

  autenticar_usuario() {
    // Implement login logic here
    // For now, just navigate to the homepage
    //this.router.navigate(['/homepage']);
  }

  registrar_usuario() {
    // Implement registration logic here
    // For now, just navigate to the homepage
    //this.router.navigate(['/homepage']);
  }
}