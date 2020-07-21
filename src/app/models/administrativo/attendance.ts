import {User} from '../authentication/user';
import {State} from './state';
import {Workday} from './workday';

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
