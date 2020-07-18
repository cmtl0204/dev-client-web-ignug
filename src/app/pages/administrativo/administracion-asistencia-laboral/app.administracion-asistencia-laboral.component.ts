import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {Car} from '../../../demo/domain/car';
import {SelectItem} from 'primeng/api';
import {CarService} from '../../../demo/service/carservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventService} from '../../../demo/service/eventservice';
import {NodeService} from '../../../demo/service/nodeservice';
import {ServiceService} from '../../../services/administrativo/service.service';
import {Attendance} from '../../../models/administrativo/attendance';
import {Workday} from '../../../models/administrativo/workday';
import {Catalogue} from '../../../models/administrativo/catalogue';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-asistencia-laboral',
    templateUrl: './app.administracion-asistencia-laboral.component.html',
    styleUrls: ['app.administracion-asistencia-laboral.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppAdministracionAsistenciaLaboralComponent implements OnInit {
    docenteActividadesItems: SelectItem[];
    selectedMultiSelectDocenteActividades: string[];
    actividadesSeleccionadas: any[];
    cols: any[];

    docenteActividades: Array<Catalogue>;
    selectedCar: Car;
    totalHorasTrabajadas: Date;
    horaInicioJornada: string;
    horaFinJornada: string;
    docenteAsistencia: Attendance;
    jornadaActividades: Array<Workday>;
    jornadaActual: Workday;
    almuerzoActual: Workday;
    fechaActual: Date;
    events: any[];
    fullCalendarOptions: any;

    constructor(private carService: CarService, private eventService: EventService, private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService, private service: ServiceService, private spinner: NgxSpinnerService) {
        this.breadcrumbService.setItems([
            {label: 'Asistencia'}
        ]);
        this.docenteAsistencia = new Attendance();
        this.jornadaActual = new Workday();
        this.almuerzoActual = new Workday();
        this.horaInicioJornada = '';
        this.horaFinJornada = null;
        this.selectedMultiSelectDocenteActividades = [];
        this.actividadesSeleccionadas = [];
    }

    ngOnInit() {
        this.cols = [
            {field: 'description', header: 'Descripción'},
            {field: 'start_time', header: 'Hora Inicio'},
            {field: 'end_time', header: 'Hora Fin'},
            {field: 'duration', header: 'Duración'},
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
        this.service.get('workdays/all?user_id=5').subscribe(
            response => {
                if (response) {
                    const asistencias = response['data']['attributes'];
                    const actividades = new Array();
                    let i = 1;
                    asistencias.forEach(asistencia => {
                        console.log(asistencia.workdays);
                        console.log(asistencia.date);
                        asistencia.workdays.forEach(actividad => {
                            actividades.push(
                                {
                                    // 'id': actividad.id,
                                    'id': i,
                                    'title': 'Inicio ' + actividad.description,
                                    'start': asistencia.date + 'T' + actividad.start_time
                                }
                            );
                            i++;
                            actividades.push(
                                {
                                    // 'id': actividad.id,
                                    'id': i,
                                    'title': 'Fin ' + actividad.description,
                                    'start': asistencia.date + 'T' + actividad.end_time
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
        this.service.get('workdays/current_day?user_id=5').subscribe(
            response => {
                if (response['data']) {
                    this.jornadaActividades = response['data']['attributes'];
                    this.fechaActual = new Date(response['meta']['current_day']);
                    let totalHorasTrabajadas = '00:00:00';
                    this.totalHorasTrabajadas = new Date();
                    if (this.jornadaActividades) {
                        this.jornadaActividades.forEach(actividad => {
                            if (actividad.type.code === 'work') {
                                if (actividad.end_time == null) {
                                    this.jornadaActual = actividad;
                                } else {
                                    this.jornadaActual = new Workday();
                                }
                                if (actividad.end_time !== null) {
                                    totalHorasTrabajadas = this.sumarHoras(actividad.duration, totalHorasTrabajadas);
                                }
                            }

                            if (actividad.type.code === 'lunch') {
                                if (actividad.end_time == null) {
                                    this.almuerzoActual = actividad;
                                } else {
                                    this.almuerzoActual = new Workday();
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
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    iniciarDocenteAsistencia(type: string, description: string) {
        const horaActual = new Date();
        const horas = horaActual.getHours().toString().length === 1 ? '0' + horaActual.getHours() : horaActual.getHours().toString();
        const minutos = horaActual.getMinutes().toString().length === 1 ? '0' + horaActual.getMinutes() : horaActual.getMinutes().toString();
        const segundos = horaActual.getSeconds().toString().length === 1 ? '0' + horaActual.getSeconds() : horaActual.getSeconds().toString();
        const workday = {
            'start_time': horas + ':' + minutos + ':' + segundos,
            'description': description,
            'type': type,
        };

        const attendance = {
            'type': 'work',
        };

        const parametros = '?user_id=5';
        this.spinner.show();
        this.service.post('workdays' + parametros, {'attendance': attendance, 'workday': workday}).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    finalizarDocenteAsistencia(workday: Workday) {
        const horaActual = new Date();
        const horas = horaActual.getHours().toString().length === 1 ? '0' + horaActual.getHours() : horaActual.getHours().toString();
        const minutos = horaActual.getMinutes().toString().length === 1 ? '0' + horaActual.getMinutes() : horaActual.getMinutes().toString();
        const segundos = horaActual.getSeconds().toString().length === 1 ? '0' + horaActual.getSeconds() : horaActual.getSeconds().toString();
        workday.observations = '';
        workday.end_time = horas + ':' + minutos + ':' + segundos;
        this.spinner.show();
        this.service.update('workdays', {'workday': workday}).subscribe(
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
        this.service.delete('workdays/' + id).subscribe(
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
                        'type_id': actividadEncontrada.id,
                        'description': '',
                        'type': {'name': actividadEncontrada.name},
                        'percentage_advance': 0
                    }
                );
            }
        });
        this.guardarActividades();
    }

    guardarActividades() {

        // if (this.actividadesSeleccionadas.length > 0) {
        const parametros = '?user_id=5';
        this.spinner.show();
        this.service.post('tasks' + parametros, {'tasks': this.actividadesSeleccionadas}).subscribe(
            response => {
                if (response['data']) {
                    this.actividadesSeleccionadas = response['data']['attributes'];
                }
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
            }
        );
        // }
    }

    obtenerCatalogoDocenteActividades() {
        this.service.get('catalogues?type=tasks.activity').subscribe(
            response => {
                this.docenteActividades = response['data']['attributes'];
                if (this.docenteActividades) {
                    this.docenteActividadesItems = [];
                    this.docenteActividades.forEach(docenteActividad => {
                            this.docenteActividadesItems.push({label: docenteActividad.name, value: docenteActividad.id});
                        }
                    )
                    ;
                }
            }
        );
    }

    obtenerDocenteActividades() {
        const parametros = '?user_id=5';
        this.spinner.show();
        this.service.get('tasks/current_day' + parametros).subscribe(
            response => {
                if (response) {
                    if (response['data']) {
                        response['data']['attributes'].forEach(value => {
                            this.selectedMultiSelectDocenteActividades.push(value.type_id);
                            this.actividadesSeleccionadas.push(
                                {
                                    'type_id': value.type_id,
                                    'description': value.description,
                                    'type': {'name': value.type.name},
                                    'percentage_advance': value.percentage_advance
                                });
                        });
                    }
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }
}

