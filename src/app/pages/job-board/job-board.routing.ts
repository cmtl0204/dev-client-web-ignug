import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {AppProfessionalsComponent} from './landing/professionals/app.professionals.component';

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'professional',
                loadChildren: () => import('./professional/professional.module').then(m => m.ProfessionalModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'company',
                loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
                // canActivate: [AuthGuard]
            }
        ]
    }
];
