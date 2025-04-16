import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vessel } from '../interfaces/vessel';

@Injectable({
  providedIn: 'root',
})
export class FirestoreApiService {
  private firestore = inject(Firestore);

  // Add Vessel method using modular API
  addVessel(data: Vessel): Promise<any> {
    const coll = collection(this.firestore, 'ships') as CollectionReference<Vessel>;
    return addDoc(coll, data);
  }

  // Get Vessels method using modular API
  getVessels(): Observable<Vessel[]> {
    const coll = collection(this.firestore, 'ships');
    return collectionData(coll, { idField: 'imo' }) as Observable<Vessel[]>;
  }

  // Delete Vessel method using modular API
  deleteVessel(imo: string): Promise<void> {
    const ref = doc(this.firestore, `ships/${imo}`);
    return deleteDoc(ref);
  }
}
