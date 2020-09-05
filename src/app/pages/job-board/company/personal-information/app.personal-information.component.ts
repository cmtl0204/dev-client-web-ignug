import {Component, OnInit} from '@angular/core';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {Company} from '../../../../models/job-board/models.index';


@Component({
    selector: 'app-personal-information',
    templateUrl: './app.personal-information.component.html',
})
export class AppPersonalInformationComponent implements OnInit {

    company: Company;

    constructor(private jobBoardService: JobBoardService) {
    }

    ngOnInit() {
        this.getCompany(4);
    }

    //Trae los datos de la companía
    getCompany(id: number): void {
        this.jobBoardService.get(`companies/ ${id}`).subscribe(
            resolve => this.company = resolve['company'][0],
            error => console.error(error)
        );
    };

    updateCompany(): void {
        const data = null;
        // const data: Company = {
        //     id: '4',
        //     // identity: this.company.identity,
        //     // email: this.company.email,
        //     // nature: this.company.nature,
        //     trade_name: this.company.trade_name,
        //     comercial_activity: this.company.comercial_activity,
        //     // phone: this.company.phone,
        //     // cell_phone: this.company.cell_phone,
        //     // web_page: this.company.web_page,
        //     // address: this.company.address,
        //     // avatar: null,
        //     // state: '1'
        // };
        this.jobBoardService.update('companies', data).subscribe(
            resolve => console.log(resolve),
            error => console.error(error)
        );
    }
}
