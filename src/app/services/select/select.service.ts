import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vessel } from '../../interfaces/vessel';
export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}
@Injectable({
  providedIn: 'root',
})
export class SelectService {
  private cardSelectedSource = new BehaviorSubject<Vessel | null>(null);
  cardSelected$ = this.cardSelectedSource.asObservable();

  selectCard(card: Vessel) {
    this.cardSelectedSource.next(card);
    localStorage.setItem('selectedCard', JSON.stringify(card)); // Guardar en localStorage
  }
  public getCardFromStorage(): Vessel | undefined {
    const saved = localStorage.getItem('selectedCard');
    return saved ? JSON.parse(saved) : undefined;
  }
}
