import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/user-profile-api/user-profile-api.service';

interface User {
  likedVessels: string[]; // Liked vessels structure as an array of strings
}

@Component({
  selector: 'app-star',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() vesselId!: string; // ID of the vessel being liked
  faStar = faStar;
  isChecked = false; // Track if the star is checked or not
  user: any;

  // Inject the necessary services through the constructor
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth, // Inject Auth service through the constructor
    private userProfileService: UserProfileService // Inject the UserProfileService
  ) {}

  ngOnInit() {
    console.log('Vessel ID:', this.vesselId); // Add this line to verify vesselId
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.checkIfLiked(); // Check if the vessel is already liked
      }
    });
  }

  // Check if the user already liked this vessel
  checkIfLiked() {
    this.userProfileService
      .getUserProfile(this.user?.uid)
      .then((profile) => {
        if (profile) {
          console.log('Liked vessels:', profile.likedVessels);
          console.log('This vessel:', this.vesselId); // Add this line to log the liked vessels
          this.isChecked = profile.likedVessels.includes(this.vesselId);
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  // Toggle the like status
  toggleCheck() {
    this.isChecked = !this.isChecked; // Toggle the check state

    if (this.user) {
      // Fetch the user profile
      this.userProfileService
        .getUserProfile(this.user.uid)
        .then((profile) => {
          if (profile) {
            // Ensure likedVessels is an array
            let likedVessels = Array.isArray(profile.likedVessels)
              ? profile.likedVessels
              : [];

            // Add or remove the vesselId from likedVessels based on isChecked
            if (this.isChecked) {
              // Add the vesselId if it's not already in the list
              if (!likedVessels.includes(this.vesselId)) {
                likedVessels.push(this.vesselId);
              }
            } else {
              // Remove the vesselId from the list
              likedVessels = likedVessels.filter((id) => id !== this.vesselId);
            }

            // Ensure that likedVessels is defined and not null
            if (likedVessels !== undefined && likedVessels !== null) {
              this.userProfileService
                .updateLikedVessels(this.user.uid, likedVessels)
                .then(() => {
                  console.log(
                    this.isChecked ? 'Vessel liked!' : 'Vessel unliked!'
                  );
                })
                .catch((error) => {
                  console.error('Error updating liked vessels:', error);
                });
            } else {
              console.error('likedVessels is undefined or null');
            }
          } else {
            console.error('User profile not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    } else {
      console.log('User not logged in');
    }
  }
}
