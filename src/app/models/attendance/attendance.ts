import {User} from '../authentication/models.index';
import {State} from '../ignug/models.index';
import {Workday} from './models.index';

export class Attendance {
    id: number;
    user: User;
    date: Date;
    workdays: Array<Workday>;
    state: State;

    constructor() {
        this.user = new User();
        this.state = new State();
        this.date = new Date();
        this.workdays = new Array<Workday>();
    }
}
