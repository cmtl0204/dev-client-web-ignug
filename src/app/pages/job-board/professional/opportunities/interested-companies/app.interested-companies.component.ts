import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

import {JobBoardService} from '../../../../../services/job-board/job-board.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-empresas-interesadas',
    templateUrl: './app.empresas-interesadas.component.html',
})
export class AppInterestedCompaniesComponent implements OnInit {

    userId: string = '2';

    companiesTrue: boolean = false;

    companies: any[];

    constructor(private spinnerService: NgxSpinnerService,
                private jobBoardService: JobBoardService,
                private messageService: MessageService,
    ) {

        //this.user = JSON.parse(localStorage.getItem('user')) as User;
    }

    ngOnInit(): void {
        this.getInterestedCompanies();

    }

    getInterestedCompanies() {
        this.spinnerService.show();
        const params = '?user_id=';
        this.jobBoardService.get(`opportunities/interested-companies${params}${this.userId}`).subscribe(
            response => {
                this.spinnerService.hide();
                if (response['data']['companies'].length == 0) {
                    this.companiesTrue = true;
                    this.companies = response['data']['companies'];
                } else {
                    this.companies = response['data']['companies'];
                }
                //console.log(this.companiesTrue);
                //console.log('veamos  ' + JSON.stringify(this.opportunities));
            }, err => {
                this.spinnerService.hide();
                //console.log('entre a lo malo' + JSON.stringify(err));
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'algo ocurrio con el servidor',
                    detail: 'intenta mas tarde',
                    life: 3500
                });
            });

    }

    getUserid(element) {
        this.userId = element;
        this.getInterestedCompanies();
    }

    showModal() {
        this.companiesTrue = true;
    }


}
