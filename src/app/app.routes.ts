import { Routes } from '@angular/router';
import { Login } from './pages/public/login/login';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Fazendas } from './pages/private/fazendas/fazendas';
import { Lotes } from './pages/private/lotes/lotes';
import { FazendaDetalhe } from './pages/private/fazenda-detalhe/fazenda-detalhe';


export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '', component: MainLayout, canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'fazendas', component: Fazendas },
            { path: 'fazenda/:id', component: FazendaDetalhe },
            { path: 'lotes', component: Lotes }
            
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
