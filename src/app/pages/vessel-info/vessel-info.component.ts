import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../services/select/select.service';
import { Router } from '@angular/router';
import { Vessel } from '../../interfaces/vessel';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { StarComponent } from '../../components/star/star.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { VesselCardComponent } from '../../components/vessel-card/vessel-card.component';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'vessel-info-component',
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
  isImageChanging = false;
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

      if (this.card1?.cruiseline) {
        this.firestore.getVessels().subscribe(
          (data) => {
            this.sameCruiselineVessels = data.filter(
              (v) =>
                v.cruiseline === this.card1?.cruiseline &&
                v.name !== this.card1?.name
            );
          },
          (error) => console.error('Error fetching vessels:', error)
        );
      }
    }
  }

  get selectedShip() {
    return this.card1?.imagePath?.[this.selectedIndex];
  }

  selectShip(index: number) {
    this.selectedIndex = index;
  }

  prevShip() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = (this.card1?.imagePath?.length ?? 1) - 1;
    }
  }

  nextShip() {
    if (this.selectedIndex < (this.card1?.imagePath?.length ?? 0) - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }

  navigateBack() {
    this.router.navigate(['catalog']);
    localStorage.setItem('returnUrl', this.router.url);
  }

  selectVessel(vessel: Vessel) {
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
