import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
CommonModule;

@Component({
  selector: 'app-star',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input() starId!: string;
  faStar = faStar;
  isChecked = false; // Track if the star is checked or not

  // Toggle the isChecked state when the checkbox is clicked
  toggleCheck() {
    this.isChecked = !this.isChecked;
  }
}
