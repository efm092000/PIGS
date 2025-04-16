import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAlGmCCS60ao6DrfV91y7bGY3kYw_-vt88',
    authDomain: 'pigs-d972f.firebaseapp.com',
    projectId: 'pigs-d972f',
    storageBucket: 'pigs-d972f.firebasestorage.app',
    messagingSenderId: '171180235442',
    appId: '1:171180235442:web:50c7a7a56c58e7e0b947ab',
    measurementId: 'G-DJC723FGMX',
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);