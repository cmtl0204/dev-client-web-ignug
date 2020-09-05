import {State} from '../ignug/models.index';

export class Catalogue {
    id: number;
    parent_code: Catalogue;
    code: string;
    name: string;
    type: string;
    icon: string;
    state: State;

    constructor() {
        this.parent_code = new Catalogue();
        this.state = new State();
    }

}

