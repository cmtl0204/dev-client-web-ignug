import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppHojaVidaComponent} from './hoja-vida/app.hoja-vida.component';
import {AppEmpresaComponentComponent} from './app-empresa-component/app-empresa-component.component';
import {AppEmpresaDosComponent} from './app-empresa-dos/app-empresa-dos.component';

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'hoja-vida',
                component: AppHojaVidaComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'empresa',
                component: AppEmpresaComponentComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'empresa-dos',
                component: AppEmpresaDosComponent,
                // canActivate: [AuthGuard]
            },
        ]
    }
];
