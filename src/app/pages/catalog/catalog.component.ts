import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SearchComponent } from "../../components/search/search.component";
import { Router } from '@angular/router';
import { SelectService } from '../../services/select/select.service';
import { StarComponent } from "../../components/star/star.component";
import { Vessel } from '../../interfaces/vessel';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';
export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}

@Component({
  selector: 'app-catalog',
  imports: [HeaderComponent, SearchComponent, StarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  searchQuery: string = ''; // Recibe el texto de búsqueda desde el componente hijo

  images: Vessel[]= [];

  
  constructor(private router: Router, 
    private cardService: SelectService,
  private firestore:FirestoreApiService) { }

  
  ngOnInit(): void {
    this.firestore.getVessels().subscribe(data => {
      this.images = data;
    });
  }

  get filteredImages() {
    return this.images.filter(img =>
      img.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchChanged(query: string) {
    this.searchQuery = query;
  }

  selectCard(card: Vessel) {
    this.cardService.selectCard(card);
    this.router.navigate(['/select']);
  }
 


}
