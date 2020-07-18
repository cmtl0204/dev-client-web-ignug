import {Routes} from '@angular/router';
import {AppAsistenciaLaboralComponent} from './docente-asistencia-laboral/app.asistencia-laboral.component';
import {AppAdministracionAsistenciaLaboralComponent} from './administracion-asistencia-laboral/app.administracion-asistencia-laboral.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'asistencia-laboral',
                component: AppAsistenciaLaboralComponent
            },
            {
                path: 'administracion-asistencia-laboral',
                component: AppAdministracionAsistenciaLaboralComponent
            },
        ]
    }
];
