import {Routes} from '@angular/router';
import {AppLandingComponent} from './app-landing/app-landing.component';
import {AuthGuard} from '../../../shared/auth-guard/auth.guard';



export const LandingRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AppLandingComponent,
                // canActivate: [AuthGuard],
            },
        ],
    },
];
