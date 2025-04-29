import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

// Define the type for the keys of isEditing outside the class
type EditableFields = 'username' | 'email' | 'password' | 'shipList' | 'profilePicture';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  // User data (simulated, replace with real database data)
  userData = {
    username: 'lorem ipsum',
    email: 'lorem@ipsum.com',
    password: '**********',
    shipList: 'Ship 1, Ship 2',
    profilePicture: '',
  };

  // Editing state for individual fields
  isEditing: Record<EditableFields, boolean> = {
    username: false,
    email: false,
    password: false,
    shipList: false,
    profilePicture: false,
  };

  // Global editing state
  editMode = false;

  // Toggle global edit mode
  toggleEditMode() {
    this.editMode = !this.editMode;

    // Enable or disable editing for all fields
    Object.keys(this.isEditing).forEach((key) => {
      this.isEditing[key as EditableFields] = this.editMode;
    });

    // If exiting edit mode, save all changes
    if (!this.editMode) {
      this.saveAllChanges();
    }
  }

  // Save all changes (placeholder for actual implementation)
  saveAllChanges() {
    console.log('Saving all changes:', this.userData);
  }

  // Handle input changes
  onInputChange(field: EditableFields, event: Event) {
    const input = event.target as HTMLInputElement;
    this.userData[field] = input.value;
  }

  // Update profile picture
  updateProfilePicture(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('New profile picture selected:', file);
      // TODO: Implement backend integration for uploading the profile picture
    }
  }
}
