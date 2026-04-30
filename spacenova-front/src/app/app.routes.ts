import { Routes } from '@angular/router';
// import { Home } from './home/home';

export const routes: Routes = [
    {
        path : 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes)
    }
];
