import { Routes } from '@angular/router';
import { CatalogComponent } from './Pages/catalog/catalog.component';
import { HomeComponent } from './Pages/home/home.component';
import { SelectComponent } from './Pages/select/select.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    { path: 'home', component: HomeComponent },
    {path:'catalog', component:CatalogComponent},
    {path:'select', component:SelectComponent},
    { path: '**', component: HomeComponent },
];
