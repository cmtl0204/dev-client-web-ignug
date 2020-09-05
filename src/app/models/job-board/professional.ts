import {AcademicFormation, Catalogue} from './models.index';
import {User} from '../authentication/models.index';
import {State} from '../ignug/models.index';

export class Professional {
    id: number;
    user: User;
    about_me: string;
    state: State;

    constructor() {
        this.user = new User();
        this.state = new State();

    }
}
