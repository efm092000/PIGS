import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [CommonButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // ICONS
  faUser = faUser;
  faSignOut = faSignOut;
  faSignIn = faSignIn;

  isAuthenticated: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user; // Set to true if the user exists, false otherwise
    });
  }

  userLogout() {
    this.authService.logout();
    this.authService.getUser().subscribe((user) => {
      this.isAuthenticated = !!user; // Set to true if the user exists, false otherwise
    });
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    localStorage.setItem('returnUrl', this.router.url);
  }
}
