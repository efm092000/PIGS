import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vessel } from '../../interfaces/vessel';
import { StarComponent } from '../star/star.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFile, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vessel-card-component',
  imports: [StarComponent, FontAwesomeModule],
  templateUrl: './vessel-card.component.html',
  styleUrl: './vessel-card.component.css',
})
export class VesselCardComponent {
  // ICONS
  faUser = faUser;
  faFile = faFile;

  @Input() vessel!: Vessel;
  @Output() cardSelected = new EventEmitter<Vessel>();

  onClick() {
    this.cardSelected.emit(this.vessel);
  }
}
