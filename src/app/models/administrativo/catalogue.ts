import {State} from './state';
import {Task} from './task';

export class Catalogue {
    id: number;
    parent_code_id: Catalogue;
    code: string;
    name: string;
    description: string;
    type: string;
    icon: string;
    state: State;
    tasks: Array<Catalogue>;
}
