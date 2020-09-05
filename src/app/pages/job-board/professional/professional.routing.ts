import {Routes} from '@angular/router';

import {AuthGuard} from '../../../shared/auth-guard/auth.guard';
import {ProfessionalComponent} from './professional.component';


export const HojaVidaRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProfessionalComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];
