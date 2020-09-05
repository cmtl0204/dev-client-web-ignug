import {Professional, Catalogue} from './models.index';
import {State} from '../ignug/models.index';

export class ProfessionalExperience {
    id: number;
    professional: Professional;
    employer: string;
    position: string;
    job_description: string;
    start_date: string;
    end_date: string;
    reason_leave: string;
    current_work: boolean;
    state: State;

    constructor() {
        this.professional = new Professional();
        this.state = new State();

    }
}

