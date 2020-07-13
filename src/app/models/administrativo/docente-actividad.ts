import {Catalogo} from './catalogo';
import {Estado} from './estado';
import {DocenteAsistencia} from './docente-asistencia';

export class DocenteActividad {
    id: number;
    docente_asistencia: DocenteAsistencia;
    descripcion: string;
    porcentaje_avance: number;
    observaciones: string;
    tipo: Catalogo;
    tipo_id: number;
    estado: Estado;
    estado_id: number;

    constructor() {
        this.estado_id = 0;
        this.estado = new Estado();
    }
}
