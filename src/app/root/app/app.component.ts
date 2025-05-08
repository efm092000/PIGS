import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'myApp';
  private router = inject(Router);

  constructor() {
    // Subscribe to router events
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page on navigation end
        window.scrollTo(0, 0);
      }
    });
  }
}
