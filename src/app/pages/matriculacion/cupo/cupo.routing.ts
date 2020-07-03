import {Routes} from '@angular/router';
import {AdministracionCupoComponent} from './administracion-cupo/administracion-cupo.component';

export const HomeRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AdministracionCupoComponent
            },
            {
                path: 'administracion-cupo',
                component: AdministracionCupoComponent
            }]
    }
];
