import {User} from '../authentication/models.index';


export class Attendance {
    id: number;
    user: User;
    date: Date;
    constructor() {
        this.user = new User();
        this.date = new Date();
    }
}
