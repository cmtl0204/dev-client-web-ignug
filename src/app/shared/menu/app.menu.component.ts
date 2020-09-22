import {Component, OnInit, Renderer2} from '@angular/core';
import {AppMainComponent} from '../../layouts/full/app.main.component';
import {SettingsService} from '../../services/ignug/settings.service';
import {User} from '../../models/authentication/user';
import {Role} from '../../models/authentication/role';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    user: User;
    role: Role;

    constructor(public app: AppMainComponent, public ajustesService: SettingsService) {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
    }

    ngOnInit() {
        /*
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Components', icon: 'pi pi-fw pi-star', routerLink: ['/components'],
                items: [
                    {label: 'Sample Page', icon: 'pi pi-fw pi-th-large', routerLink: ['/components/sample']},
                    {label: 'Forms', icon: 'pi pi-fw pi-file', routerLink: ['/components/forms']},
                    {label: 'Data', icon: 'pi pi-fw pi-table', routerLink: ['/components/data']},
                    {label: 'Panels', icon: 'pi pi-fw pi-list', routerLink: ['/components/panels']},
                    {label: 'Overlays', icon: 'pi pi-fw pi-clone', routerLink: ['/components/overlays']},
                    {label: 'Menus', icon: 'pi pi-fw pi-plus', routerLink: ['/components/menus']},
                    {label: 'Messages', icon: 'pi pi-fw pi-envelope', routerLink: ['/components/messages']},
                    {label: 'Charts', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/components/charts']},
                    {label: 'File', icon: 'pi pi-fw pi-upload', routerLink: ['/components/file']},
                    {label: 'Misc', icon: 'pi pi-fw pi-spinner', routerLink: ['/components/misc']}
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    {label: 'Empty', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty']},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/authentication/login'], target: '_blank'},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/authentication/500'], target: '_blank'},
                    {label: '404', icon: 'pi pi-fw pi-times', routerLink: ['/authentication/404'], target: '_blank'},
                    {
                        label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                        routerLink: ['/authentication/401'], target: '_blank'
                    }
                ]
            },
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Docs', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            },
            {
                label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            }
        ];
        */

        if (this.role.code === '1') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
            ];
        }
        if (this.role.code === '2') {
            this.model = [
                {label: 'Catalogues', icon: 'pi pi-fw pi-list', routerLink: ['/ignug/catalogues']},
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
                {
                    label: 'Administración Asistencia',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/attendance/administracion-asistencia-laboral']
                },
            ];
        }
        if (this.role.code === '3') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
                {
                    label: 'Administración Asistencia',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/attendance/administracion-asistencia-laboral']
                },
            ];
        }
        if (this.role.code === '4') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
                {
                    label: 'Administración Asistencia',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/attendance/administracion-asistencia-laboral']
                },
            ];
        }
        if (this.role.code === '5') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
                {
                    label: 'Administración Asistencia',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/attendance/administracion-asistencia-laboral']
                },
            ];
        }
        if (this.role.code === '6') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
            ];
        }
        if (this.role.code === '7') {
            this.model = [
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/attendance/asistencia-laboral']},
            ];
        }
    }

    onMenuClick() {
        this.app.menuClick = true;
    }
}
