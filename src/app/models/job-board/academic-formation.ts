import {Catalogue, Category, Professional} from './models.index';
import {State} from '../ignug/models.index';

export class AcademicFormation {
    id: number;
    professional: Professional;
    category: Category;
    professional_degree: Catalogue;
    registration_date: Date;
    senescyt_code: string;
    has_titling: boolean;
    state: State;

    constructor() {
        this.category = new Category();
        this.professional_degree = new Catalogue();
        this.state = new State();
    }
}

