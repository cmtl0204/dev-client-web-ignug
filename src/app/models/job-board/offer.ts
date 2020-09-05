import {Catalogue, Company, Location} from './models.index';
import {State} from './../ignug/models.index';

export class Offer {
    id: number;
    company: Company;
    code: string;
    contact: string;
    email: string;
    phone: string;
    cell_phone: string;
    contract_type: Catalogue;
    position: string;
    training_hours: string;
    experience_time: string;
    remuneration: string;
    working_day: string;
    number_jobs: string;
    start_date: Date;
    end_date: Date;
    activities: string[];
    aditional_information: string;
    location: Location;
    state: State;

    constructor() {
        this.company = new Company();
        this.contract_type = new Catalogue();
        this.location = new Location();
        this.state = new State();
    }
}

