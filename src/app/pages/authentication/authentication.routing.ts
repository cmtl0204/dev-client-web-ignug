import {Routes} from '@angular/router';

import {AppNotfoundComponent} from './404/app.notfound.component';
import {AppAccessdeniedComponent} from './401/app.accessdenied.component';
import {AppErrorComponent} from './500/app.error.component';
import {AppLoginComponent} from './login/app.login.component';

export const AuthenticationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '404',
                component: AppNotfoundComponent
            },
            {
                path: '401',
                component: AppAccessdeniedComponent
            },
            {
                path: '500',
                component: AppErrorComponent
            },
            {
                path: 'login',
                component: AppLoginComponent
            },

        ]
    }
];
