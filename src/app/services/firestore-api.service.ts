import { inject, Injectable } from '@angular/core';
//import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Vessel } from '../interfaces/vessel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreApiService {

  constructor(private firestore: AngularFirestore) {
    firestore = inject(AngularFirestore)
  }



  addVessel<Vessel>(data: Vessel): Promise<any> {
    return this.firestore.collection<Vessel>('ships').add(data);
  }

  getVessels<Vessel>(): Observable<Vessel[]> {
    return this.firestore.collection<Vessel>('ships').valueChanges({ idField: 'IMO' });
  }

  deleteVessel<Vessel>(IMO: string): Promise<void> {
    return this.firestore.doc<Vessel>(`ships/${IMO}`).delete();
  }

}
