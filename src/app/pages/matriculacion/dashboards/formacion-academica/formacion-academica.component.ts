import {Component, OnInit} from '@angular/core';
import {CountryService} from '../../../../demo/service/countryservice';
import {SelectItem, MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../../../shared/breadcrumb/breadcrumb.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-dashboard-coordinador',
    templateUrl: './formacion-academica.component.html'
})
export class FormacionAcademicaComponent implements OnInit {
    constructor(private countryService: CountryService, private breadcrumbService: BreadcrumbService, private spinner: NgxSpinnerService) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: ['/dashboard/coordinador']},
            {label: 'Formación Académica'},
        ]);
    }

    ngOnInit() {

    }


}
