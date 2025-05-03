import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'common-button',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.css',
})
export class CommonButtonComponent {
  @Input() icon!: IconDefinition;
  @Input() text!: string;
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
