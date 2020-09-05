import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/auth-guard/auth.guard';
import {CompanyComponent} from './company.component';



export const CompanyRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: CompanyComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];
