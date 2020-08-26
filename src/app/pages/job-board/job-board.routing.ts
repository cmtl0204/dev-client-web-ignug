import {Routes} from '@angular/router';

import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppEmpresaComponentComponent} from './app-empresa-component/app-empresa-component.component';
import {AppEmpresaDosComponent} from './app-empresa-dos/app-empresa-dos.component';

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'hoja-vida',
                loadChildren: () => import('./hoja-vida/hoja-vida.module').then(m => m.HojaVidaModule),
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
