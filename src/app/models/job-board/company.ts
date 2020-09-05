import {Catalogue} from './models.index';
import {State} from '../ignug/models.index';

export class Company {
    id: string;
    type: Catalogue;
    web_page: string;
    trade_name: string;
    comercial_activity: string;
    state: State;

    constructor() {
        this.web_page = '';
        this.trade_name = '';
        this.comercial_activity = '';
        this.comercial_activity = '';
        this.state = new State();
    }
}
