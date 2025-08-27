import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./modules/home/home').then(p => p.Home)
    },
    {
        path: '**',
        title: 'Sua Pokédex',
        loadComponent: () => import('./modules/home/home').then(p => p.Home)
    }
];
