import {Routes} from '@angular/router';

import {AuthGuard} from '../../../shared/auth-guard/auth.guard';
import {AppDatosPersonalesComponent} from './app-datos-personales/app-datos-personales.component';


export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'datos-personales',
                component: AppDatosPersonalesComponent,
                // canActivate: [AuthGuard]
            },
        ]
    }
];
