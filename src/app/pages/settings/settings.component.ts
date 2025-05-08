import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListOfShipsComponent } from '../../components/list-of-ships/list-of-ships.component';

import { UserProfile } from '../../interfaces/user-profile';
import { UserProfileService } from '../../services/user-profile-api/user-profile-api.service';

type EditableFields = 'username';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CommonButtonComponent,
    HeaderComponent,
    FooterComponent,
    ListOfShipsComponent,
  ],
})
export class SettingsComponent implements OnInit {
  private auth: Auth = inject(Auth);

  userData: {
    uid: string;
    username: string;
    email: string;
    password: string;
    shipList: string[];
  } = {
    uid: '',
    username: '',
    email: '',
    password: '',
    shipList: [],
  };

  isEditing = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (!user) {
        console.warn('User not logged in');
        return;
      }

      this.userData.uid = user.uid;
      this.userData.email = user.email || '';
      this.userData.password = '**********';

      const profile = await this.userProfileService.getUserProfile(user.uid);
      if (profile) {
        this.userData.username = profile.name;
        this.userData.shipList = profile.likedVessels || [];
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    const updatedProfile: UserProfile = {
      uid: this.userData.uid,
      name: this.userData.username,
      companyVerified: false,
      likedVessels: this.userData.shipList,
    };

    this.userProfileService
      .createOrUpdateUserProfile(updatedProfile)
      .then(() => {
        this.isEditing = false;
      });
  }

  onInputChange(field: EditableFields, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.userData[field] = input.value;
  }
}
