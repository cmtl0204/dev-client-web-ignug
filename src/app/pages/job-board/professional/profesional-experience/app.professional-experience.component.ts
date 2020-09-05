import {Component, OnInit} from '@angular/core';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {Professional} from '../../../../models/job-board/models.index';
import {ProfessionalExperience} from '../../../../models/job-board/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Catalogue} from 'src/app/models/ignug/catalogue';
import {State} from 'src/app/models/ignug/state';

@Component({
    selector: 'app-professional-experience',
    templateUrl: './app.professional-experience.component.html',
})
export class AppProfessionalExperienceComponent implements OnInit {
    professional: Professional;
    employer: string;
    catalogue: Catalogue;
    job_description: string;
    reason_leave: string;
    current_work: boolean;
    state_id: State;
    validationStart_date: string;
    validationFinish_date: string;
    experiences: Array<ProfessionalExperience>; // para almacenar el listado de todos los usuarios

    constructor() {
    }

    ngOnInit() {

    }


}
