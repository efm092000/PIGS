import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vessel } from '../../interfaces/vessel';
import { FirestoreApiService } from '../../services/firestore-api.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-ship-form',
  imports: [FormsModule, AngularFirestoreModule],
  standalone: true,
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.css']
})
export class ShipFormComponent implements OnInit{
  protected vessel: Vessel = {imo: 0,
    name: "",
    length: 0,
    width: 0,
    draft: 0,
    grossTonnage: 0,
    passengerCap: 0,
    year: 0,
    imagePath: ""};

  constructor (private firestoreService: FirestoreApiService) {}

  ngOnInit(): void {
    
  }

  async onSubmit() {
    console.log('Firestore Service: ', this.firestoreService);
    console.log('Submitting:', this.vessel);
    const response = await this.firestoreService.addVessel(this.vessel);
    console.log('Response:', response);
  }
}
