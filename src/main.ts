import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // <-- IMPORTA ESTO

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, AppRoutingModule, HttpClientModule), provideFirebaseApp(() => initializeApp({ projectId: "pigs-d972f", appId: "1:171180235442:web:50c7a7a56c58e7e0b947ab", storageBucket: "pigs-d972f.firebasestorage.app", apiKey: "AIzaSyAlGmCCS60ao6DrfV91y7bGY3kYw_-vt88", authDomain: "pigs-d972f.firebaseapp.com", messagingSenderId: "171180235442", measurementId: "G-DJC723FGMX" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()) // <-- AGREGA HttpClientModule
  ]
}).catch(err => console.error(err));
