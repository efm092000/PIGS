import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}
  cargarPagina(url: string) {
    this.router.navigate([url]);
    localStorage.setItem('returnUrl', this.router.url);
  }
}
