import {Catalogue, Professional} from './models.index';
import {State} from '../ignug/models.index';

export class Language {
    id: number;
    professional: Professional;
    written_level: Catalogue;
    spoken_level: Catalogue;
    reading_level: Catalogue;
    state: State;

    constructor() {
        this.professional = new Professional();
        this.written_level = new Catalogue();
        this.spoken_level = new Catalogue();
        this.reading_level = new Catalogue();
        this.state = new State();

    }
}

