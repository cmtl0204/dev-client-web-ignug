import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../shared/breadcrumb/breadcrumb.service';

@Component({
    templateUrl: './panelsdemo.component.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
            margin-left: .25em;
        }

        :host ::ng-deep .ui-splitbutton button {
            margin-right: 0;
        }`
    ]
})
export class PanelsDemoComponent implements OnInit {

    items: MenuItem[];

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Components' },
            { label: 'Panels', routerLink: ['/components/panels'] }
        ]);
    }

    ngOnInit() {
        this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'pi pi-file', routerLink: ['/theming'] }
        ];
    }
}
