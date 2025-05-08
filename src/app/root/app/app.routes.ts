import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ShipFormComponent } from '../../components/ship-form/ship-form.component';
import { CatalogComponent } from '../../pages/catalog/catalog.component';
import { VesselInfoComponent } from '../../pages/vessel-info/vessel-info.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { SettingsComponent } from '../../pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: ShipFormComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'select', component: VesselInfoComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'settings', component: SettingsComponent },
];
