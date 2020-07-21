import {Component, OnInit, Renderer2} from '@angular/core';
import {AppMainComponent} from '../../layouts/full/app.main.component';
import {SettingsService} from '../../services/matriculacion/settings.service';
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

        if (this.role.code === '1') {
            this.model = [
                // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
                // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/coordinador']},
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/administrativo/asistencia-laboral']},
                /*
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
                 */
            ];
        }
        if (this.role.code === '2') {
            this.model = [
                // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
                // {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard/coordinador']},
                {label: 'Asistencia', icon: 'pi pi-fw pi-calendar', routerLink: ['/administrativo/asistencia-laboral']},
                {
                    label: 'Administración Asistencia',
                    icon: 'pi pi-fw pi-clock',
                    routerLink: ['/administrativo/administracion-asistencia-laboral']
                },
                /*
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
                 */
            ];
        }
    }

    onMenuClick() {
        this.app.menuClick = true;
    }
}
