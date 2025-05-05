import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dropdown-info-component',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './dropdown-info.component.html',
  styleUrl: './dropdown-info.component.css',
})
export class DropdownInfoComponent {
  //ICONS
  faChevronDown = faChevronDown;

  @Input() title?: string;
  @Input() body?: string;

  isOpen: boolean = false;
}
