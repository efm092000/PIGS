import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirestoreApiService } from '../firestore-api/firestore-api.service';
import { UserProfile } from '../../interfaces/user-profile';
import { UserProfileService } from '../user-profile-api/user-profile-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _auth: AngularFireAuth,
    private firestoreApi: FirestoreApiService,
    private userProfileApi: UserProfileService
  ) {}

  getUser(): Observable<User | null> {
    return this._auth.authState as Observable<User | null>;
  }

  signup(email: string, password: string, name: string) {
    return this._auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        if (cred.user) {
          const profile: UserProfile = {
            uid: cred.user.uid,
            name,
            companyVerified: false,
            likedVessels: [],
          };
          return this.userProfileApi.createOrUpdateUserProfile(profile);
        }
        return null;
      });
  }

  login(email: string, password: string) {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this._auth.signOut();
  }
}
