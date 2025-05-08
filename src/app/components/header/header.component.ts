import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // ICONS
  faUser = faUser;
  faSignOut = faSignOut;
  faSignIn = faSignIn;

  // CURRENT ROUTE
  currentRoute: string = '';

  isAuthenticated: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user; // Set to true if the user exists, false otherwise
      this.currentRoute = this.router.url.split('/')[1] || 'home';
    });
  }

  userLogout() {
    this.authService.logout();
    this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user; // Set to true if the user exists, false otherwise
    });

    this.reloadCurrentPage();
    this.router.navigate(['home']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    localStorage.setItem('returnUrl', this.router.url);
  }

  reloadCurrentPage() {
    // Navigate to the current route
    this.router.navigate([this.router.url]).then(() => {
      // Optionally, do something after the navigation is complete (like resetting state, etc.)
      console.log('Navigated to the same route');
    });
  }
}
