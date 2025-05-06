import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faArrowRight,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { SelectService } from '../../services/select/select.service';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';
import { Vessel } from '../../interfaces/vessel';

import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { StarComponent } from '../../components/star/star.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { VesselCardComponent } from '../../components/vessel-card/vessel-card.component';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'vessel-info-component',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    StarComponent,
    CommonButtonComponent,
    FooterComponent,
    FontAwesomeModule,
    VesselCardComponent,
  ],
  templateUrl: './vessel-info.component.html',
  styleUrls: ['./vessel-info.component.css'],
})
export class VesselInfoComponent implements OnInit {
  vessels: Vessel[] = [];
  card1?: Vessel;
  sameCruiselineVessels: Vessel[] = [];
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faCircleArrowLeft = faCircleArrowLeft;
  faCircleArrowRight = faCircleArrowRight;
  selectedIndex = 0;

  constructor(
    private cardService: SelectService,
    private router: Router,
    private firestore: FirestoreApiService
  ) {}

  ngOnInit(): void {
    const storedCard = this.cardService.getCardFromStorage();
    if (storedCard) {
      this.card1 = storedCard;

      if (this.card1.cruiseline) {
        this.firestore.getVessels().subscribe({
          next: (data) => {
            this.sameCruiselineVessels = data.filter(
              (v) =>
                v.cruiseline === this.card1?.cruiseline &&
                v.name !== this.card1?.name
            );
          },
          error: (err) => console.error('Error fetching vessels:', err),
        });
      }
    }
  }

  get selectedShip(): string | undefined {
    return this.card1?.imagePath?.[this.selectedIndex];
  }

  selectShip(index: number): void {
    this.selectedIndex = index;
  }

  prevShip(): void {
    const imagesLength = this.card1?.imagePath?.length ?? 1;
    this.selectedIndex =
      this.selectedIndex > 0 ? this.selectedIndex - 1 : imagesLength - 1;
  }

  nextShip(): void {
    const imagesLength = this.card1?.imagePath?.length ?? 0;
    this.selectedIndex =
      this.selectedIndex < imagesLength - 1 ? this.selectedIndex + 1 : 0;
  }

  navigateBack(): void {
    this.router.navigate(['catalog']);
    localStorage.setItem('returnUrl', this.router.url);
  }

  selectVessel(vessel: Vessel): void {
    this.cardService.selectCard(vessel);

    if (this.router.url !== '/select') {
      this.router.navigate(['/select']);
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/select']);
      });
    }

    window.location.reload();
    window.scrollTo(0, 0);
  }
}
