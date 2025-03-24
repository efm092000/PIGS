import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento sin la extensión .ts
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,// Agrega el módulo de enrutamiento
    RegisterComponent,
    LoginComponent,
    AppComponent,
    HomepageComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }