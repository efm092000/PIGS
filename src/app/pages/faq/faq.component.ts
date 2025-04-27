import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  openStates: boolean[] = [false, false,false]; // extendé si tenés más preguntas

  togglePanel(index: number) {
    this.openStates[index] = !this.openStates[index];
  }
  

}
