import {User} from '../authentication/models.index';
import {State} from '../ignug/models.index';

export class Professional {
    id: number;
    user: User;
    first_name: string;
    lastName: string;
    state: State;

    constructor() {

    }
}
