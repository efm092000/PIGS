import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
export interface Card {
  id: number;
  nombre: string;
  imagen: string[];
}
@Injectable({
  providedIn: 'root'
})
export class CardserviceService {
  private cardSelectedSource = new BehaviorSubject<Card | null>(null);
  cardSelected$ = this.cardSelectedSource.asObservable();

  selectCard(card: Card) {
    this.cardSelectedSource.next(card);
    localStorage.setItem('selectedCard', JSON.stringify(card)); // Guardar en localStorage
  }
  public getCardFromStorage(): Card | undefined {
    const saved = localStorage.getItem('selectedCard');
    return saved ? JSON.parse(saved) : undefined;
  }

}
