import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';

export const WebRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'menu',
                loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
                // canActivate: [AuthGuard],
            },
        ],
    },
];
