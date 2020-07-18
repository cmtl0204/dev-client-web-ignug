import {State} from './state';

export class Catalogue {
    id: number;
    parent_code_id: Catalogue;
    code: string;
    name: string;
    type: string;
    icon: string;
    state: State;
}
