import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vessel } from '../../interfaces/vessel';
import { FirestoreApiService } from '../../services/firestore-api.service';

@Component({
  selector: 'app-ship-form',
  imports: [FormsModule],
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.css']
})
export class ShipFormComponent implements OnInit{
  protected vessel!: Vessel;

  constructor (private firestoreService: FirestoreApiService) {}

  ngOnInit(): void {
    
  }

  async onSubmit() {
    const response = await this.firestoreService.addVessel(this.vessel);
    console.log(response);
  }
}
