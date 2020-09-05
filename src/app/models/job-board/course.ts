import {Professional, Catalogue} from './models.index';
import {State} from '../ignug/models.index';

export class Course {
    id: number;
    professional: Professional;
    event_type: Catalogue;
    institution: Catalogue;
    event_name: string;
    start_date: Date;
    end_date: Date;
    hours: string;
    type_certification: Catalogue;
    state: State;

    constructor() {
        this.institution = new Catalogue();
        this.event_type = new Catalogue();
        this.type_certification = new Catalogue();
        this.state = new State();
    }
}

