import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: AngularFireAuth) {}

  getUser(): Observable<User | null> {
    return this._auth.authState as Observable<User | null>;
  }

  signup(email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this._auth.signOut();
  }

  register(email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }
}
