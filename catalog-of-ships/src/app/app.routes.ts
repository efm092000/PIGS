import { Routes } from '@angular/router';
import { CatalogComponent } from './Pages/catalog/catalog.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent },
    {path:'catalog', component:CatalogComponent},
    { path: '**', component: HomeComponent },
];
