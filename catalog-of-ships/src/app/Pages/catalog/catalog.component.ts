import { Component } from '@angular/core';
import { SearchComponent } from "../../Components/search/search.component";
import { StarComponent } from "../../Components/star/star.component"; 
import { Router } from '@angular/router';
import { CardserviceService } from '../../Service/cardservice.service';

export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [SearchComponent, StarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  searchQuery: string = ''; // Recibe el texto de búsqueda desde el componente hijo

  images = [
    {id: 1, nombre: "Barco 1", imagen: ["assets/image/crucero oceanico.jpeg","assets/image/logobarcos.png","assets/image/crucero oceanico.jpeg","assets/image/crucero oceanico.jpeg"] },
    {id: 2, nombre: "Barco 2", imagen: ["assets/barco2.jpg"] },
    {id: 3, nombre: "Barco 3", imagen: ["assets/barco3.jpg"] },
    {id: 4, nombre: "Barco 4", imagen: ["assets/barco4.jpg"] },
    {id: 5, nombre: "Barco 5", imagen: ["assets/barco1.jpg" ]},
    {id: 6, nombre: "Barco 6", imagen: ["assets/barco2.jpg" ]},
    {id: 7, nombre: "Barco 7", imagen: ["assets/barco3.jpg"] },
    {id: 8, nombre: "Barco 8", imagen: ["assets/barco4.jpg" ]}
  ];

  get filteredImages() {
    return this.images.filter(img =>
      img.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchChanged(query: string) {
    this.searchQuery = query; // Actualiza el valor de searchQuery con el emitido por el hijo
  }
  constructor(private router: Router, private cardService: CardserviceService) { }

  
  selectCard(card: Card) {
    this.cardService.selectCard(card);
    this.router.navigate(['/select']);
  }

}
