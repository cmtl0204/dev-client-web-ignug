import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './layouts/full/app.main.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {AuthGuard} from './shared/auth-guard/auth.guard';
import {AppModule} from './app.module';

export const routes: Routes = [
    {
        path: '',
        component: AppMainComponent,
        children: [
            {path: '', component: DashboardDemoComponent, canActivate: [AuthGuard]},
            {path: 'components/sample', component: SampleDemoComponent},
            {path: 'components/forms', component: FormsDemoComponent},
            {path: 'components/data', component: DataDemoComponent},
            {path: 'components/panels', component: PanelsDemoComponent},
            {path: 'components/overlays', component: OverlaysDemoComponent},
            {path: 'components/menus', component: MenusDemoComponent},
            {path: 'components/messages', component: MessagesDemoComponent},
            {path: 'components/misc', component: MiscDemoComponent},
            {path: 'pages/empty', component: EmptyDemoComponent},
            {path: 'components/charts', component: ChartsDemoComponent},
            {path: 'components/file', component: FileDemoComponent},
            {path: 'documentation', component: DocumentationComponent},
            {
                path: 'ignug',
                loadChildren: () => import('./pages/ignug/ignug.module').then(m => m.IgnugModule),
                // canActivate: [AuthGuard]
            },
            {
                path: 'attendance',
                loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'job-board',
                loadChildren: () => import('./pages/job-board/job-board.module').then(m => m.JobBoardModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'web',
                loadChildren: () => import('./pages/web/web.module').then(m => m.WebModule),
                // canActivate: [AuthGuard]
            },
        ]
    },
    {
        path: 'authentication',
        component: BlankComponent,
        loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'app-job-board',
        component: BlankComponent,
        loadChildren: () => import('./pages/job-board/landing/landing.module').then(m => m.LandingModule)
    },
    {
        path: 'app-web',
        component: BlankComponent,
        loadChildren: () => import('./pages/web/web.module').then(m => m.WebModule)
    },
    {path: '**', redirectTo: '/authentication/404'},

];

export const AppRoutes: ModuleWithProviders<AppModule> = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
