import { Component, OnInit } from '@angular/core';
import { VesselCardComponent } from '../vessel-card/vessel-card.component';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { Vessel } from '../../interfaces/vessel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SelectService } from '../../services/select/select.service';
import { FirestoreApiService } from '../../services/firestore-api/firestore-api.service';
import { Input } from '@angular/core';

@Component({
  selector: 'list-of-ships-component',
  imports: [
    VesselCardComponent,
    SearchComponent,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './list-of-ships.component.html',
  styleUrl: './list-of-ships.component.css',
})
export class ListOfShipsComponent implements OnInit {
  @Input() likedVesselIds: string[] = []; // Add this input

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

  get filteredVessels(): Vessel[] {
    const key = this.sortKeyMap[this.currentSort];
    const query = this.searchQuery.toLowerCase();

    let filtered = this.vessels;

    // If likedVesselIds is defined but empty, show no ships
    if (Array.isArray(this.likedVesselIds)) {
      if (this.likedVesselIds.length === 0) {
        return [];
      }

      // If it's not the "show all" signal, filter liked
      if (!this.likedVesselIds.includes('*')) {
        filtered = filtered.filter((vessel) =>
          this.likedVesselIds.includes(vessel.id)
        );
      }
    }

    // Apply name filter
    filtered = filtered.filter((vessel) =>
      vessel.name?.toLowerCase().includes(query)
    );

    // Apply sort
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
}
