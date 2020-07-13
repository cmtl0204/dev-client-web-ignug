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
import {DocenteActividad} from '../../../models/administrativo/docente-actividad';
import {Catalogo} from '../../../models/administrativo/catalogo';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-asistencia-laboral',
    templateUrl: './app.asistencia-laboral.component.html',
    styleUrls: ['app.asistencia-laboral.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppAsistenciaLaboralComponent implements OnInit {
    docenteActividadesItems: SelectItem[];
    selectedMultiSelectDocenteActividades: string[];
    actividadesSeleccionadas: any[];
    cols: any[];

    docenteActividades: Array<Catalogo>;
    selectedCar: Car;
    totalHorasTrabajadas: Date;
    horaInicioJornada: string;
    horaFinJornada: string;
    docenteAsistencia: DocenteAsistencia;
    jornadaActividades: Array<JornadaActividad>;
    jornadaActividadActual: JornadaActividad;
    fechaActual: Date;
    events: any[];
    fullCalendarOptions: any;

    constructor(private carService: CarService, private eventService: EventService, private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService, private service: ServiceService, private spinner: NgxSpinnerService) {
        this.breadcrumbService.setItems([
            {label: 'Asistencia'}
        ]);
        this.docenteAsistencia = new DocenteAsistencia();
        this.jornadaActividadActual = new JornadaActividad();
        this.horaInicioJornada = '';
        this.horaFinJornada = null;
        this.selectedMultiSelectDocenteActividades = [];
        this.actividadesSeleccionadas = [];
    }

    ngOnInit() {
        this.cols = [
            {field: 'descripcion', header: 'Descripción'},
            {field: 'hora_inicio', header: 'Hora Inicio'},
            {field: 'hora_fin', header: 'Hora Fin'},
            {field: 'duracion', header: 'Duración'},
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
        this.obtenerCatalogoDocenteActividades();
        this.obtenerDocenteActividades();
    }

    obtenerJornadaActividadesTodos() {
        this.spinner.show();
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
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
            }
        );
    }

    obtenerJornadaActividadesDiaria() {
        this.spinner.show();
        this.service.get('docentes/asistencia_laboral?user_id=1').subscribe(
            response => {
                this.jornadaActividades = response['jornada_actividades'];
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
                    const horas = Number(duracionJornada[0]);
                    const minutos = Number(duracionJornada[1]);
                    const segundos = Number(duracionJornada[2]);
                    this.totalHorasTrabajadas.setHours(horas);
                    this.totalHorasTrabajadas.setMinutes(minutos);
                    this.totalHorasTrabajadas.setSeconds(segundos);
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
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
        this.spinner.show();
        this.service.post('docentes/asistencia_laboral' + parametros, horaInicioActividad).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
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
        this.spinner.show();
        this.service.post('docentes/asistencia_laboral/finalizar' + parametros, horaFinActividad).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
                this.obtenerJornadaActividadesTodos();
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    eliminarJornadaActividad(id: number) {
        this.spinner.show();
        this.service.delete('docentes/asistencia_laboral?jornada_actividad_id=' + id).subscribe(
            response => {
                if (response) {
                    this.obtenerJornadaActividadesTodos();
                    this.obtenerJornadaActividadesDiaria();
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
            }
        );
    }

    sumarHoras(duracion: string, totalHorasTrabajadas: string): string {
        const duracionTotal = totalHorasTrabajadas.split(':');

        const horaTotal = Number(duracionTotal[0]);
        const minutoTotal = Number(duracionTotal[1]);
        const segundoTotal = Number(duracionTotal[2]);

        const duracionParcial = duracion.split(':');
        const horaParcial = Number(duracionParcial[0]);
        const minutoParcial = Number(duracionParcial[1]);
        const segundoParcial = Number(duracionParcial[2]);

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

    agregarActividad() {
        let i = 0;
        const indices = [];
        this.actividadesSeleccionadas.forEach(actividadSeleccionada => {
            const actividad = this.selectedMultiSelectDocenteActividades.find(element => Number(element) === actividadSeleccionada.tipo_id);
            if (actividad === undefined) {
                indices.push(i);
            }
            i++;
        });
        indices.forEach(value => {
            this.actividadesSeleccionadas.splice(value, 1);
        });
        this.selectedMultiSelectDocenteActividades.forEach(actividadSeleccionada => {
            if (this.actividadesSeleccionadas.find(x => x.tipo_id === actividadSeleccionada) === undefined) {
                const actividadEncontrada = this.docenteActividades.find(element => element.id === Number(actividadSeleccionada));
                this.actividadesSeleccionadas.push(
                    {
                        'tipo_id': actividadEncontrada.id,
                        'tipo': {'nombre': actividadEncontrada.nombre},
                        'porcentaje_avance': 0
                    }
                );
            }
        });
        this.guardarActividades();
    }

    guardarActividades() {

        // if (this.actividadesSeleccionadas.length > 0) {
            const parametros = '?user_id=1' + '&descripcion=JORNADA';
            this.spinner.show();
            this.service.post('docentes/actividades' + parametros, {'docenteActividades': this.actividadesSeleccionadas}).subscribe(
                response => {
                    this.actividadesSeleccionadas = response['docente_actividades'];
                    this.spinner.hide();
                },
                error => {
                    this.spinner.hide();
                }
            );
        // }
    }

    obtenerCatalogoDocenteActividades() {
        this.service.get('catalogos?tipo=docente_actividades.actividades').subscribe(
            response => {
                this.docenteActividades = response['catalogos'];
                if (this.docenteActividades) {
                    this.docenteActividadesItems = [];
                    this.docenteActividades.forEach(docenteActividad => {
                            this.docenteActividadesItems.push({label: docenteActividad.nombre, value: docenteActividad.id});
                        }
                    )
                    ;
                }
            }
        );
    }

    obtenerDocenteActividades() {
        const parametros = '?user_id=1';
        this.spinner.show();
        this.service.get('docentes/actividades' + parametros).subscribe(
            response => {
                if (response) {
                    response['docente_actividades'].forEach(value => {
                        this.selectedMultiSelectDocenteActividades.push(value.tipo_id);
                        this.actividadesSeleccionadas.push(
                            {
                                'tipo_id': value.tipo_id,
                                'tipo': {'nombre': value.tipo.nombre},
                                'porcentaje_avance': value.porcentaje_avance
                            });
                    });
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }
}

