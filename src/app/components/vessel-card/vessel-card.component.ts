import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vessel } from '../../interfaces/vessel';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'vessel-card-component',
  imports: [StarComponent],
  templateUrl: './vessel-card.component.html',
  styleUrl: './vessel-card.component.css',
})
export class VesselCardComponent {
  @Input() vessel!: Vessel;
  @Output() cardSelected = new EventEmitter<Vessel>();

  onClick() {
    this.cardSelected.emit(this.vessel);
  }
}
