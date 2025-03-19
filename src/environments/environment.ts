// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const environment = {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: "AIzaSyAlGmCCS60ao6DrfV91y7bGY3kYw_-vt88",
    authDomain: "pigs-d972f.firebaseapp.com",
    projectId: "pigs-d972f",
    storageBucket: "pigs-d972f.firebasestorage.app",
    messagingSenderId: "171180235442",
    appId: "1:171180235442:web:50c7a7a56c58e7e0b947ab",
    measurementId: "G-DJC723FGMX"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
