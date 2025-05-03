import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vessel } from '../../interfaces/vessel';
import { StarComponent } from '../../components/star/star.component';

@Component({
  selector: 'cruise-card-component',
  imports: [StarComponent],
  templateUrl: './cruise-card.component.html',
  styleUrl: './cruise-card.component.css',
})
export class CruiseCardComponent {
  @Input() vessel!: Vessel;
  @Output() cardSelected = new EventEmitter<Vessel>();

  onClick() {
    this.cardSelected.emit(this.vessel);
  }
}
