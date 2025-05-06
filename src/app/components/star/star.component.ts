import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserProfileService } from '../../services/user-profile-api/user-profile-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() vesselId!: string;
  faStar = faStar;
  isChecked = false;
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        this.checkIfLiked();
      }
    });
  }

  private checkIfLiked() {
    if (this.user) {
      this.userProfileService
        .getUserProfile(this.user.uid)
        .then((profile) => {
          this.isChecked =
            profile?.likedVessels?.includes(this.vesselId) ?? false;
        })
        .catch(this.handleError);
    }
  }

  toggleCheck() {
    this.isChecked = !this.isChecked;
    if (this.user) {
      this.updateLikedVessels();
    }
  }

  private updateLikedVessels() {
    this.userProfileService
      .getUserProfile(this.user.uid)
      .then((profile) => {
        const likedVessels = profile?.likedVessels ?? [];

        if (this.isChecked) {
          if (!likedVessels.includes(this.vesselId)) {
            likedVessels.push(this.vesselId);
          }
        } else {
          const index = likedVessels.indexOf(this.vesselId);
          if (index !== -1) {
            likedVessels.splice(index, 1);
          }
        }

        this.userProfileService
          .updateLikedVessels(this.user.uid, likedVessels)
          .catch(this.handleError);
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error:', error);
  }
}
