import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vessel } from '../interfaces/vessel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreApiService {

  constructor(private firestore: Firestore) { }

  addVessel(vessel: Vessel) {
    const vesselRef = collection(this.firestore, 'vessels');
    return addDoc(vesselRef, vessel);
  }

  getVessels(): Observable<Vessel[]> {
    const vesselRef = collection(this.firestore, 'vessels');
    return collectionData(vesselRef, { idField: 'IMO' }) as Observable<Vessel[]>;
  }

  deleteVessel(vessel: Vessel) {
    const vesselDocRef = doc(this.firestore, `vessels/${vessel.IMO}`);
    return deleteDoc(vesselDocRef);
  }

}
