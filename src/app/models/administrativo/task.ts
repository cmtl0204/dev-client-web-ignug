import {Catalogue} from './catalogue';
import {State} from './state';
import {Attendance} from './attendance';

export class Task {
    id: number;
    attendance: Attendance;
    description: string;
    progress: number;
    observations: string;
    type: Catalogue;
    type_id: number;
    state: State;
    state_id: number;

    constructor() {
        this.state_id = 0;
        this.state = new State();
    }
}
