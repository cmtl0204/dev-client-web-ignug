import {User} from '../authentication/models.index';
import {State} from '../ignug/models.index';
import {Attendance2} from './models.index';

export class Professional {
    id: number;
    user: User;
    date: Date;
    state: State;
    attendance2: Attendance2;
    constructor() {
        this.date = new Date();

    }
}
