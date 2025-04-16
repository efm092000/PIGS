import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardserviceService } from '../../Service/cardservice.service';
export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}


@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent implements OnInit {

  constructor(private cardService: CardserviceService) { }
  card1?: Card;


  ngOnInit() {
    const storedCard = this.cardService.getCardFromStorage();
    if (storedCard) {
      this.card1 = storedCard;
      this.selectedIndex = 0;
      console.log('Card cargado desde localStorage:', this.card1.nombre);
    }
  }
  selectedIndex = 0;

  get selectedShip() {
    return this.card1?.imagen[this.selectedIndex];
  }

  selectShip(index: number) {
    this.selectedIndex = index;
  }

  prevShip() {
    if (this.selectedIndex > 0) this.selectedIndex--;
  }

  nextShip() {
    if (this.selectedIndex < (this.card1?.imagen.length ?? 0) - 1) this.selectedIndex++;
  }

}
