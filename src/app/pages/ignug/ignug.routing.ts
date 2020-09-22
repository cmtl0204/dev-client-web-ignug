import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/auth-guard/auth.guard';
import {CatalogueComponent} from './catalogue/catalogue.component';

export const IgnugRoutes: Routes = [
    {
        path: 'catalogues',
        component: CatalogueComponent,
        // canActivate: [AuthGuard]
    }
];
