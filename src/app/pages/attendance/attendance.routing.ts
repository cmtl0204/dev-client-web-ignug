import {Routes} from '@angular/router';
import {AppAsistenciaLaboralComponent} from './docente-asistencia-laboral/app.asistencia-laboral.component';
import {AppAdministracionAsistenciaLaboralComponent} from './administracion-asistencia-laboral/app.administracion-asistencia-laboral.component';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';

export const AttendanceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'asistencia-laboral',
                component: AppAsistenciaLaboralComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'administracion-asistencia-laboral',
                component: AppAdministracionAsistenciaLaboralComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];
