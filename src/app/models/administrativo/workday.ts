import {Catalogue} from './catalogue';
import {State} from './state';
import {Attendance} from './attendance';

export class Workday {
    id: number;
    attendance: Attendance;
    start_time: string;
    duration: string;
    end_time: string;
    description: string;
    observations: string;
    type: Catalogue;
    type_id: number;
    state: State;
    state_id: number;

    constructor() {
        this.start_time = '';
        this.end_time = '';
        this.state_id = 0;
        this.state = new State();
    }
}
