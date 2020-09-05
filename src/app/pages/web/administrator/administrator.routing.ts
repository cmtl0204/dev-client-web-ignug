import {Routes} from '@angular/router';
import {AppAdministratorComponent} from './app-administrator/app.administrator.component';
import {AuthGuard} from '../../../shared/auth-guard/auth.guard';



export const LandingRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AppAdministratorComponent,
                // canActivate: [AuthGuard],
            },
        ],
    },
];
