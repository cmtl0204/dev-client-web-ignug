import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';

export const WebRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'mision',
            //    component: AppAsistenciaLaboralComponent,
                // canActivate: [AuthGuard]
            },
            {
                path: 'historia',
                //    component: AppAsistenciaLaboralComponent,
                // canActivate: [AuthGuard]
            },

        ]
    }
];
