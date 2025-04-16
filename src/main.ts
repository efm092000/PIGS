import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/root/app/app.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/root/app.routes';

// Modular Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Compat Firebase imports
import { AngularFireModule } from '@angular/fire/compat';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    provideFirestore(() => getFirestore()),

    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig)  // Wrap in importProvidersFrom
    ),

    provideAuth(() => getAuth())
  ]
}).catch((err) => console.error(err));
