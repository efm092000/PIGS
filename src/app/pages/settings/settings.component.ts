import { Component, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { UserProfile } from '../../interfaces/user-profile';
import { UserProfileService } from '../../services/user-profile-api/user-profile-api.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { inject } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

// import Firebase Auth if you want current UID

type EditableFields = 'username' | 'shipList';

@Component({
  imports: [
    CommonButtonComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private userProfileService: UserProfileService) {}

  auth: Auth = inject(Auth);

  userData: any = {
    uid: 'user123', // Replace with auth UID dynamically
    username: '',
    email: '', // Display only
    password: '', // Display only
    shipList: '',
  };

  isEditing: Record<EditableFields, boolean> = {
    username: false,
    shipList: false,
  };

  ngOnInit() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.userData.uid = user.uid;
        this.userData.email = user.email || '';
        this.userData.password = '**********'; // just for display

        // Get profile from Firestore
        this.userProfileService.getUserProfile(user.uid).then((profile) => {
          if (profile) {
            this.userData.username = profile.name;
            this.userData.shipList = profile.likedVessels.join(', ');
          }
        });
      } else {
        // Not logged in — handle redirect or error state
        console.warn('User not logged in');
      }
    });
  }

  toggleFieldEdit(field: EditableFields) {
    Object.keys(this.isEditing).forEach((key) => {
      this.isEditing[key as EditableFields] = key === field;
    });
  }

  onInputChange(field: EditableFields, event: Event) {
    const input = event.target as HTMLInputElement;
    this.userData[field] = input.value;
  }

  saveField(field: EditableFields) {
    if (field === 'username' || field === 'shipList') {
      const updatedProfile: UserProfile = {
        uid: this.userData.uid,
        name: this.userData.username,
        companyVerified: false,
        likedVessels: this.userData.shipList
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => !!s),
      };

      this.userProfileService
        .createOrUpdateUserProfile(updatedProfile)
        .then(() => {
          this.isEditing[field] = false;
        });
    }
  }
}
