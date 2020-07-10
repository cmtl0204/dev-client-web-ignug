import {User} from './user';
import {Estado} from './estado';
import {JornadaActividad} from './jornada-actividad';

export class DocenteAsistencia {
    id: number;
    user: User;
    fecha: Date;
    jornada_actividades: Array<JornadaActividad>;
    estado: Estado;

    constructor() {
        this.user = new User();
        this.estado = new Estado();
        this.fecha = new Date();
        this.jornada_actividades = new Array<JornadaActividad>();
    }
}
