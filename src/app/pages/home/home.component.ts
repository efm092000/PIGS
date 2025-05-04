import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SelectService } from '../../services/select/select.service';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';
import { Vessel } from '../../interfaces/vessel';
import { VesselCardComponent } from '../../components/vessel-card/vessel-card.component';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';

@Component({
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    VesselCardComponent,
    CommonButtonComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vessels: Vessel[] = [];
  randomVessels: Vessel[] = []; // Array to store 3 random vessels

  constructor(
    private router: Router,
    private selectService: SelectService,
    private firestore: FirestoreApiService
  ) {}

  ngOnInit(): void {
    this.firestore.getVessels().subscribe((data) => {
      this.vessels = data;
      this.pickRandomVessels();
    });
  }

  // Method to pick 3 random vessels from the available vessels
  pickRandomVessels(): void {
    if (this.vessels.length >= 3) {
      const shuffled = this.vessels.sort(() => 0.5 - Math.random()); // Shuffle the array
      this.vessels = shuffled.slice(0, 3); // Take the first 3 vessels
    }
  }

  selectVessel(vessel: Vessel): void {
    this.selectService.selectCard(vessel);
    this.router.navigate(['/select']);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    localStorage.setItem('returnUrl', this.router.url);
  }
}
