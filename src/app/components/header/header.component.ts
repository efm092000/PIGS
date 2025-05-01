import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated = false; // Cambia esto según tu lógica de autenticación

  constructor(private router: Router) {}

  cargarPagina(page: string) {
    this.router.navigate([`/${page}`]);
  }

  navigateToSettings() {
    if (this.isAuthenticated) {
      this.router.navigate(['/settings']);
    }
  }

  userLogout() {
    // Lógica para cerrar sesión
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
