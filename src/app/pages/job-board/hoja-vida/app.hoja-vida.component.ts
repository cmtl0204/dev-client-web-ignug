import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Professional} from '../../../models/job-board/models.index';
import {JobBoardServiceService} from '../../../services/job-board/job-board-service.service';
import {IgnugServiceService} from '../../../services/ignug/ignug-service.service';

@Component({
    selector: 'app-hoja-vida',
    templateUrl: './app.hoja-vida.component.html',
    styleUrls: ['app.hoja-vida.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService]
})
export class AppHojaVidaComponent implements OnInit {
    professional: Professional;
    professionals: Array<Professional>;
    professionalSelected: Professional;

    constructor(private jobBoardService: JobBoardServiceService,
                private ignugService: IgnugServiceService) {
        this.professional = new Professional();
        this.professionalSelected = new Professional();
        this.professionals = new Array<Professional>();
    }
    ngOnInit(): void {

    }

    getProfessionals(): void {
        this.jobBoardService.get('professionals').subscribe(
            response => {
                this.professionals = response['data']['attributes'];
                console.log(this.professionals);
            },
            error => {
                console.log('error');
                console.log(error);
            }
        );
    }
}
