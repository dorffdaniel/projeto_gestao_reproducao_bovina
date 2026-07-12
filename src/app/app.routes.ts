import { Routes } from '@angular/router';
import { Login } from './pages/public/login/login';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Fazendas } from './pages/private/fazenda/fazendas/fazendas';
import { FazendaDetalhe } from './pages/private/fazenda/fazenda-detalhe/fazenda-detalhe';
import { FazendaNova } from './pages/private/fazenda/fazenda-nova/fazenda-nova';
import { PerfilUser } from './pages/private/perfil/perfil-user/perfil-user';
import { GerenciarLotes } from './pages/private/lotes/gerenciar-lotes/gerenciar-lotes';


export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '', component: MainLayout, canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'fazendas', component: Fazendas },
            { path: 'fazenda/:id', component: FazendaDetalhe },
            { path: 'fazendas/nova', component: FazendaNova },
            { path: 'perfil', component: PerfilUser },
            { path: 'lote', component: GerenciarLotes }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
