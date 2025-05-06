import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  DocumentReference,
  updateDoc,
} from '@angular/fire/firestore';
import { UserProfile } from '../../interfaces/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private firestore = inject(Firestore);

  // Set (or overwrite) user profile
  createOrUpdateUserProfile(userProfile: UserProfile): Promise<void> {
    const userRef = doc(
      this.firestore,
      `users/${userProfile.uid}`
    ) as DocumentReference<UserProfile>;
    return setDoc(userRef, userProfile);
  }

  // Get user profile
  getUserProfile(uid: string): Promise<UserProfile | undefined> {
    const userRef = doc(
      this.firestore,
      `users/${uid}`
    ) as DocumentReference<UserProfile>;
    return getDoc(userRef).then((snapshot) =>
      snapshot.exists() ? snapshot.data() : undefined
    );
  }

  // Update liked vessels
  updateLikedVessels(uid: string, likedVessels: string[]): Promise<void> {
    const userRef = doc(
      this.firestore,
      `users/${uid}`
    ) as DocumentReference<UserProfile>;
    return updateDoc(userRef, { likedVessels });
  }
}
