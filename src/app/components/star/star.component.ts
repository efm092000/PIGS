import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface User {
  likedVessels: { id: string }[]; // Liked vessels structure
}

@Component({
  selector: 'app-star',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() starId!: string; // Unique ID for each star button (e.g., vessel ID)
  @Input() vesselId!: string; // ID of the vessel being liked
  faStar = faStar;
  isChecked = false; // Track if the star is checked or not
  user: any;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Subscribe to user authentication state
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.checkIfLiked(); // Check if the vessel is already liked
      }
    });
  }

  // Check if the user already liked this vessel
  checkIfLiked() {
    const userRef = this.firestore.collection('users').doc(this.user?.uid);

    userRef.get().subscribe((doc) => {
      const data = doc.data() as User; // Cast to the User interface
      if (data && data.likedVessels) {
        // Check if the vessel is in the likedVessels array
        this.isChecked = data.likedVessels.some(
          (vessel) => vessel.id === this.vesselId
        );
      }
    });
  }

  // Toggle the like status
  toggleCheck() {
    this.isChecked = !this.isChecked;

    if (this.user) {
      const userRef = this.firestore.collection('users').doc(this.user.uid);

      userRef.get().subscribe((doc) => {
        const data = doc.data() as User; // Cast to the User interface
        let likedVessels = data?.likedVessels || [];

        if (this.isChecked) {
          // Add the vessel to the likedVessels array
          likedVessels.push({ id: this.vesselId });
        } else {
          // Remove the vessel from the likedVessels array
          likedVessels = likedVessels.filter(
            (vessel) => vessel.id !== this.vesselId
          );
        }

        // Update the user's liked vessels in Firestore
        userRef
          .update({ likedVessels })
          .then(() => {
            console.log(this.isChecked ? 'Vessel liked!' : 'Vessel unliked!');
          })
          .catch((error) => {
            console.error('Error updating liked vessels:', error);
          });
      });
    } else {
      console.log('User not logged in');
    }
  }
}
