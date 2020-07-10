import {Routes} from '@angular/router';
import {AppAsistenciaLaboralComponent} from './docente-asistencia-laboral/app.asistencia-laboral.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'asistencia-laboral',
                component: AppAsistenciaLaboralComponent
            },
        ]
    }
];
