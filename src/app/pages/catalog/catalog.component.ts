import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSortAmountUp,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

import { Vessel } from '../../interfaces/vessel';
import { SelectService } from '../../services/select/select.service';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';

import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VesselCardComponent } from '../../components/vessel-card/vessel-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    VesselCardComponent,
    FontAwesomeModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  searchQuery = '';
  vessels: Vessel[] = [];
  sortDirection: 'asc' | 'desc' = 'desc';
  currentSort = 'passengers';
  showDropdown = false;

  sortOptions = ['passengers', 'crew', 'year', 'speed'];
  sortKeyMap: Record<string, keyof Vessel> = {
    passengers: 'passengerCap',
    crew: 'crew',
    year: 'year',
    speed: 'speed',
  };

  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;

  constructor(
    private router: Router,
    private selectService: SelectService,
    private firestore: FirestoreApiService
  ) {}

  ngOnInit(): void {
    this.firestore.getVessels().subscribe((data) => {
      this.vessels = data;
    });
  }

  get filteredVessels(): Vessel[] {
    const key = this.sortKeyMap[this.currentSort];
    const query = this.searchQuery.toLowerCase();

    const filtered = this.vessels.filter((vessel) =>
      vessel.name?.toLowerCase().includes(query)
    );

    return filtered.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal === undefined || bVal === undefined) return 0;

      const result =
        typeof aVal === 'number' && typeof bVal === 'number'
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  updateSearch(query: string): void {
    this.searchQuery = query;
  }

  selectVessel(vessel: Vessel): void {
    this.selectService.selectCard(vessel);
    this.router.navigate(['/select']);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  changeSort(option: string): void {
    this.currentSort = option;
    this.showDropdown = false;
  }
}
