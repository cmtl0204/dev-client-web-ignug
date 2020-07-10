import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {Car} from '../../../demo/domain/car';
import {LazyLoadEvent, SelectItem, TreeNode} from 'primeng/api';
import {CarService} from '../../../demo/service/carservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventService} from '../../../demo/service/eventservice';
import {NodeService} from '../../../demo/service/nodeservice';
import {ServiceService} from '../../../services/administrativo/service.service';
import {DocenteAsistencia} from '../../../models/administrativo/docente-asistencia';
import {JornadaActividad} from '../../../models/administrativo/jornada-actividad';
import {timer, Observable, Subject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
    selector: 'app-asistencia-laboral',
    templateUrl: './app.asistencia-laboral.component.html',
    styleUrls: ['app.asistencia-laboral.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppAsistenciaLaboralComponent implements OnInit {
    date1: Date;
    cols: any[];
    brands: SelectItem[];
    colors: SelectItem[];
    selectedCar: JornadaActividad;

    totalHorasTrabajadas: Date;
    horaInicioJornada: string;
    horaFinJornada: string;
    docenteAsistencia: DocenteAsistencia;
    jornadaActividades: Array<JornadaActividad>;
    jornadaActividadActual: JornadaActividad;
    fechaActual: Date;
    events: any[];
    fullCalendarOptions: any;

    hora: number;
    minutos: string;
    ampm: string;
    diadesemana: string;
    diaymes: string;
    segundo: string;

    clock: Observable<Date>;
    infofecha$ = new Subject<AppAsistenciaLaboralComponent>();
    vr: any;
    hours: number;
    minute: string;
    weekday: string;
    months: string;

    constructor(private carService: CarService, private eventService: EventService, private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService, private service: ServiceService) {
        this.breadcrumbService.setItems([
            {label: 'Asistencia'}
        ]);
        this.docenteAsistencia = new DocenteAsistencia();
        this.jornadaActividadActual = new JornadaActividad();
        this.horaInicioJornada = '';
        this.horaFinJornada = null;
        // this.clock = timer(0, 1000).pipe(map(t => new Date()), shareReplay(1));

    }

    ngOnInit() {
        this.brands = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
        this.cols = [
            {field: 'descripcion', header: 'Descripción'},
            {field: 'hora_inicio', header: 'Hora Inicio'},
            {field: 'hora_fin', header: 'Hora Fin'},
            {field: 'duracion', header: 'Duración'},
        ];
        this.colors = [
            {label: 'White', value: 'White'},
            {label: 'Green', value: 'Green'},
            {label: 'Silver', value: 'Silver'},
            {label: 'Black', value: 'Black'},
            {label: 'Red', value: 'Red'},
            {label: 'Maroon', value: 'Maroon'},
            {label: 'Brown', value: 'Brown'},
            {label: 'Orange', value: 'Orange'},
            {label: 'Blue', value: 'Blue'}
        ];
        this.obtenerJornadaActividadesDiaria();
        this.obtenerJornadaActividadesTodos();
        this.fullCalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: new Date(),
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        };
        // this.getInfoReloj();
    }

    obtenerJornadaActividadesTodos() {
        this.service.get('docentes/asistencia_laboral/todos?user_id=1').subscribe(
            response => {
                if (response) {
                    const docenteAsistencias = response['docente_asistencias'];
                    const actividades = new Array();
                    docenteAsistencias.forEach(asistencia => {
                        asistencia.jornada_actividades.forEach(actividad => {
                            actividades.push(
                                {
                                    'id': actividad.id,
                                    'title': 'Inicio ' + actividad.descripcion,
                                    'start': asistencia.fecha + 'T' + actividad.hora_inicio,
                                }
                            );
                            actividades.push(
                                {
                                    'id': actividad.id + 1,
                                    'title': 'Fin ' + actividad.descripcion,
                                    'start': asistencia.fecha + 'T' + actividad.hora_fin,
                                }
                            );
                        });
                    });
                    this.events = actividades;

                }
            }
        );
    }

    obtenerJornadaActividadesDiaria() {
        this.service.get('docentes/asistencia_laboral?user_id=1').subscribe(
            response => {
                this.jornadaActividades = response['jornada_actividades'];
                console.log(this.jornadaActividades);
                this.fechaActual = new Date(response['fecha_actual']);
                let totalHorasTrabajadas = '00:00:00';
                this.totalHorasTrabajadas = new Date();
                if (this.jornadaActividades) {
                    this.jornadaActividades.forEach(actividad => {
                        if (actividad.hora_fin == null) {
                            this.jornadaActividadActual = actividad;
                        } else {
                            this.jornadaActividadActual = new JornadaActividad();
                        }
                        if (actividad.tipo.codigo === 'jornada') {
                            if (actividad.hora_fin !== null) {
                                totalHorasTrabajadas = this.sumarHoras(actividad.duracion, totalHorasTrabajadas);
                            }
                        }
                    });

                    const duracionJornada = totalHorasTrabajadas.split(':');
                    const horas = parseInt(duracionJornada[0]);
                    const minutos = parseInt(duracionJornada[1]);
                    const segundos = parseInt(duracionJornada[2]);

                    console.log(this.totalHorasTrabajadas);
                    this.totalHorasTrabajadas.setHours(horas);
                    this.totalHorasTrabajadas.setMinutes(minutos);
                    this.totalHorasTrabajadas.setSeconds(segundos);
                    console.log(this.totalHorasTrabajadas);
                }
            }
        );
    }

    iniciarDocenteAsistencia(tipoId: number, descripcion: string) {
        const horaActual = new Date();
        const horaInicioActividad = {
            'hora_inicio_jornada': {
                'hora': horaActual.getHours(),
                'minuto': horaActual.getMinutes(),
                'segundo': horaActual.getSeconds()
            }
        };
        const parametros = '?user_id=1' + '&tipo_id=' + tipoId + '&descripcion=' + descripcion;
        this.service.post('docentes/asistencia_laboral' + parametros, horaInicioActividad).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
            }
        );
    }

    finalizarDocenteAsistencia() {
        const horaActual = new Date();
        const horaFinActividad = {
            'hora_fin_jornada': {
                'hora': horaActual.getHours(),
                'minuto': horaActual.getMinutes(),
                'segundo': horaActual.getSeconds()
            }
        };
        const parametros = '?jornada_actividad_id=' + this.jornadaActividadActual.id;
        this.service.post('docentes/asistencia_laboral/finalizar' + parametros, horaFinActividad).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
                this.obtenerJornadaActividadesTodos();
            }
        );
    }

    eliminarJornadaActividad(id: number) {
        this.service.delete('docentes/asistencia_laboral?jornada_actividad_id=' + id).subscribe(
            response => {
                if (response) {
                    this.obtenerJornadaActividadesTodos();
                    this.obtenerJornadaActividadesDiaria();
                }
            }
        );
    }

    sumarHoras(duracion: string, totalHorasTrabajadas: string): string {
        const duracionTotal = totalHorasTrabajadas.split(':');
        console.log(duracionTotal);
        const horaTotal = parseInt(duracionTotal[0]);
        const minutoTotal = parseInt(duracionTotal[1]);
        const segundoTotal = parseInt(duracionTotal[2]);

        const duracionParcial = duracion.split(':');
        const horaParcial = parseInt(duracionParcial[0]);
        const minutoParcial = parseInt(duracionParcial[1]);
        const segundoParcial = parseInt(duracionParcial[2]);

        let horaAdicional = 0;
        let minutoAdicional = 0;
        if (segundoTotal + segundoParcial > 60) {
            minutoAdicional = 1;
        }
        if (minutoTotal + minutoParcial > 60) {
            horaAdicional = 1;
        }

        const horaSuma = horaTotal + horaParcial + horaAdicional;
        const minutoSuma = (minutoTotal + minutoParcial + minutoAdicional) > 60 ? 0 : minutoTotal + minutoParcial + minutoAdicional;
        const segundoSuma = (segundoTotal + segundoParcial) > 60 ? 0 : segundoTotal + segundoParcial;

        return horaSuma + ':' + minutoSuma + ':' + segundoSuma;
    }

    getInfoReloj(): Observable<AppAsistenciaLaboralComponent> {
        this.clock.subscribe(t => {
            this.hours = t.getHours() % 12;
            this.hours = this.hours ? this.hours : 12;
            this.hora = this.hours;
            this.minutos = (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString();
            this.ampm = t.getHours() > 11 ? 'PM' : 'AM';
            this.segundo = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString();
        });
        return this.infofecha$.asObservable();
    }
}

