import { Component } from '@angular/core';
import { SelectService } from '../../services/select/select.service';
import { HeaderComponent } from "../../components/header/header.component";
import { Vessel } from '../../interfaces/vessel';
import { Router } from '@angular/router';
import { CatalogComponent } from '../catalog/catalog.component';
import { StarComponent } from "../../components/star/star.component";
export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}

@Component({
  selector: 'app-select',
  imports: [HeaderComponent, StarComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  constructor(private cardService: SelectService,private router: Router) { }
  card1?: Vessel;

  ngOnInit() {
    const storedCard = this.cardService.getCardFromStorage();
    if (storedCard) {
      this.card1 = storedCard;
      this.selectedIndex = 0;
      console.log('Card cargado desde localStorage:', this.card1?.imagePath);
    }
  }
  selectedIndex = 0;

  get selectedShip() {
    return this.card1?.imagePath?.[this.selectedIndex]
  }

  selectShip(index: number) {
    this.selectedIndex = index;
  }

  prevShip() {
    if (this.selectedIndex > 0) this.selectedIndex--;
  }

  nextShip() {
    if (this.selectedIndex < (this.card1?.imagePath?.length ?? 0) - 1) this.selectedIndex++;
  }
  cargarPagina() {
    this.router.navigate(['catalog']);
    localStorage.setItem('returnUrl', this.router.url);
  }

}
