import {State} from '../ignug/models.index';

export class Category {
    id: number;
    parent_code: Category;
    code: string;
    name: string;
    type: string;
    icon: string;
    state: State;
    children: Category[];

    constructor() {
        this.parent_code = new Category();
        this.children = new Array<Category>();
        this.state = new State();
    }
}

