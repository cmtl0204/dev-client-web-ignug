import {Professional} from './models.index';
import {State} from './../ignug/models.index';

export class ProfessionalReference {
    id: number;
    professional: Professional;
    institution: string;
    position: string;
    contact: string;
    phone: string;
    state: State;

    constructor() {
        this.professional = new Professional();
        this.state = new State();

    }
}

