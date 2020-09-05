import {Component, OnInit} from '@angular/core';

import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {User} from '../../../../models/authentication/models.index';

@Component({
    selector: 'app--oportunidades',
    templateUrl: './app.oportunities.component.html',
    styleUrls: ['./app.oportunities.component.scss']
})
export class AppOportunitiesComponent implements OnInit {

    user: User;
    // opportunitiess: Offer = {
    //     'id': 1,
    //     'company_id': 1,
    //     'code': '68667610',
    //     'contact': 'Laila Kerluke',
    //     'email': 'santa.runte@cormier.com',
    //     'phone': '+5284166673367',
    //     'cell_phone': '+9123004475352',
    //     'contract_type': 'Torrance Gorczany',
    //     'position': 'Government Property Inspector',
    //     'training_hours': '8',
    //     'experience_time': 'Sin experiencia',
    //     'remuneration': '425',
    //     'working_day': '7',
    //     'number_jobs': '23',
    //     'start_date': '1980/07/15',
    //     'finish_date': '2022/08/27',
    //     'activities': 'php, JavaScript, Html5, Css3, Java, Ux, Desing responsive',
    //     'aditional_information': 'horarios fexlibles',
    //     'location_id': 1,
    //     'state_id': 1,
    //     'created_at': '2020-09-02T04:38:12.000000Z',
    //     'updated_at': '2020-09-02T04:38:12.000000Z'
    // };
    opportunities: any;

    constructor(private spinnerService: NgxSpinnerService,
                private jobBoardService: JobBoardService,
                private messageService: MessageService,
    ) {

        this.user = JSON.parse(localStorage.getItem('user')) as User;
    }

    ngOnInit(): void {
        this.getOportunities();
    }

    getOportunities() {
        this.spinnerService.show();
        const params = '?user_id=101';
        this.jobBoardService.get('offers/applied_offers' + params).subscribe(
            response => {
                console.log('entre a lo bueno' + JSON.stringify(response));
                this.spinnerService.hide();
                this.opportunities = response['opportunities'];
                console.log(this.opportunities);
            }, err => {
                this.spinnerService.hide();
                console.log('entre a lo malo' + JSON.stringify(err));
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'algo ocurrio con el servidor',
                    detail: 'intenta mas tarde',
                    life: 3500
                });
            });
    }



}
