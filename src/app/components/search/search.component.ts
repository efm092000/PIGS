import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = ''; // Este es el texto que el usuario ingresa en el input
  
  @Output() searchChanged: EventEmitter<string> = new EventEmitter(); // EventEmitter para emitir el cambio

  onSearchChange(event: any): void {
    this.searchQuery = event.target.value; // Actualiza el valor de searchQuery con lo que el usuario escribe
    this.searchChanged.emit(this.searchQuery); // Emite el valor actualizado
  }
}
