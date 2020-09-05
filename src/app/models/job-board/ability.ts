import {State} from './../ignug/models.index';
import {Professional, Catalogue} from './models.index';

export class Ability {
    id: number;
    professional: Professional;
    category: Catalogue;
    description: string;
    state: State;

    constructor() {
        this.professional = new Professional();
        this.category = new Catalogue();
        this.state = new State();
    }
}

