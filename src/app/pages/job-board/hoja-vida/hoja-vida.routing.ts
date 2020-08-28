import {Routes} from '@angular/router';

import {AuthGuard} from '../../../shared/auth-guard/auth.guard';
import {AppDatosPersonalesComponent} from './app-datos-personales/app-datos-personales.component';
import {HojaVidaComponent} from './hoja-vida.component';


export const HojaVidaRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HojaVidaComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];
