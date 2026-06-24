import { Routes } from '@angular/router';
import { Login } from './pages/public/login/login';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/private/dashboard/dashboard';


export const routes: Routes = [
    { path: '', component: Login}, 
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard]}
];
