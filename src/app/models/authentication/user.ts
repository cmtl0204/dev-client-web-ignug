import {Catalogue} from '../ignug/models.index';

export class User {
    id?: number;
    first_name: string;
    second_name?: string;
    first_lastname: string;
    second_lastname?: string;
    identification: string;
    user_name?: string;
    password?: string;
    repeatPassword?: string;
    ethnic_origin: Catalogue;
    location: Catalogue;
    identification_type: Catalogue;
    sex: Catalogue;
    gender: Catalogue;
    state?: Catalogue;
    birthdate: Date;
    email: string;

    constructor() {
        this.password = '';
        this.ethnic_origin = new Catalogue();
        this.location = new Catalogue();
        this.identification_type = new Catalogue();
        this.sex = new Catalogue();
        this.gender = new Catalogue();
        this.state = new Catalogue();
    }
}
