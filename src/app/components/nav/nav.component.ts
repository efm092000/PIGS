import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false; // Track if the user is authenticated
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the user authentication state and update the isAuthenticated flag
    this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user; // If user exists, set to true
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); // Redirect to login after logging out
    });
  }
}
