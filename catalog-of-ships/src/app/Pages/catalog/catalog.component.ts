import { Component } from '@angular/core';
import { SearchComponent } from "../../Components/search/search.component";
import { CommonModule } from '@angular/common';
import { StarComponent } from "../../Components/star/star.component"; 



@Component({
  selector: 'app-catalog',
  imports: [SearchComponent, CommonModule, StarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  searchQuery: string = ''; // Recibe el texto de búsqueda desde el componente hijo

  images = [
    { nombre: "Barco 1", imagen: "assets/image/crucero oceanico.jpeg" },
    { nombre: "Barco 2", imagen: "assets/barco2.jpg" },
    { nombre: "Barco 3", imagen: "assets/barco3.jpg" },
    { nombre: "Barco 4", imagen: "assets/barco4.jpg" },
    { nombre: "Barco 1", imagen: "assets/barco1.jpg" },
    { nombre: "Barco 2", imagen: "assets/barco2.jpg" },
    { nombre: "Barco 3", imagen: "assets/barco3.jpg" },
    { nombre: "Barco 4", imagen: "assets/barco4.jpg" }
  ];

  get filteredImages() {
    return this.images.filter(img =>
      img.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchChanged(query: string) {
    this.searchQuery = query; // Actualiza el valor de searchQuery con el emitido por el hijo
  }

}
