import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { DropdownInfoComponent } from '../../components/dropdown-info/dropdown-info.component';

@Component({
  selector: 'app-faq',
  imports: [
    HeaderComponent,
    FooterComponent,
    DropdownInfoComponent,
    CommonModule,
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  openStates: boolean[] = [false, false, false]; // extendé si tenés más preguntas

  togglePanel(index: number) {
    this.openStates[index] = !this.openStates[index];
  }
}
