import {Catalogue} from './models.index';
import {State} from '../ignug/models.index';
import {Attendance} from './models.index';

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
