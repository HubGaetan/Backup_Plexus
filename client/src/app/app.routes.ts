import { Routes } from '@angular/router';
import { HomecrisisComponent } from './crisis/homecrisis/homecrisis.component';
import { DetailcrisisComponent } from './crisis/detailcrisis/detailcrisis.component';
import { AddcrisisComponent } from './crisis/addcrisis/addcrisis.component';
import { UpdatecrisisComponent } from './crisis/updatecrisis/updatecrisis.component';

export const routes: Routes = [
    { path: '', component: HomecrisisComponent },
    { path: 'home', component: HomecrisisComponent },
    { path: 'detail/:id', component: DetailcrisisComponent },
    { path: 'addcrisis', component: AddcrisisComponent },
    { path: 'updatecrisis/:id', component: UpdatecrisisComponent }
];
