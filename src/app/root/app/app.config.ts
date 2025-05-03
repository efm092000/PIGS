import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'pigs-d972f',
        appId: '1:171180235442:web:50c7a7a56c58e7e0b947ab',
        storageBucket: 'pigs-d972f.firebasestorage.app',
        apiKey: 'AIzaSyAlGmCCS60ao6DrfV91y7bGY3kYw_-vt88',
        authDomain: 'pigs-d972f.firebaseapp.com',
        messagingSenderId: '171180235442',
        measurementId: 'G-DJC723FGMX',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
