import {Catalogo} from './catalogo';
import {Estado} from './estado';
import {DocenteAsistencia} from './docente-asistencia';

export class JornadaActividad {
    id: number;
    docente_asistencia: DocenteAsistencia;
    hora_inicio: string;
    duracion: string;
    hora_fin: string;
    descripcion: string;
    tipo: Catalogo;
    tipo_id: number;
    estado: Estado;
    estado_id: number;

    constructor() {
        this.hora_inicio = '';
        this.hora_fin = '';
        this.estado_id = 0;
        this.estado = new Estado();
    }
}
