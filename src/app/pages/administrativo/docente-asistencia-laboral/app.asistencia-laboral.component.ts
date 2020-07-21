import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {Car} from '../../../demo/domain/car';
import {MessageService, SelectItem, TreeNode} from 'primeng/api';
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
import {User} from '../../../models/authentication/user';
import {Task} from '../../../models/administrativo/task';

@Component({
    selector: 'app-asistencia-laboral',
    templateUrl: './app.asistencia-laboral.component.html',
    styleUrls: ['app.asistencia-laboral.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})
export class AppAsistenciaLaboralComponent implements OnInit {
    docenteActividadesAcademicoItems: any[];
    docenteActividadesInvestigacionItems: any[];
    docenteActividadesVinculacionItems: any[];
    docenteActividadesAdministrativoItems: any[];
    selectedMultiSelectDocenteActividades: string[];
    actividadesAcademicoSeleccionadas: any[];
    actividadesInvestifacionSeleccionadas: any[];
    actividadesVinculacionSeleccionadas: any[];
    actividadesAdministrativoSeleccionadas: any[];
    cols: any[];
    colsActividades: any[];
    sourceCars: Car[];
    targetCars: Car[];
    actividadSeleccionada: any;
    display: boolean;

    docenteActividades: Array<Catalogue>;
    selectedCar: Car;
    totalHorasTrabajadas: Date;
    totalHorasAlmuerzo: Date;
    horaInicioJornada: string;
    horaFinJornada: string;
    docenteAsistencia: Attendance;
    jornadaActividades: Array<Workday>;
    jornadaActual: Workday;
    almuerzoActual: Workday;
    fechaActual: Date;
    events: any[];
    fullCalendarOptions: any;
    user: User;

    constructor(private message: MessageService, private carService: CarService, private eventService: EventService, private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService, private service: ServiceService, private spinner: NgxSpinnerService) {
        this.breadcrumbService.setItems([
            {label: 'Registro Asistencia'}
        ]);
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.docenteAsistencia = new Attendance();
        this.jornadaActual = new Workday();
        this.almuerzoActual = new Workday();
        this.horaInicioJornada = '';
        this.horaFinJornada = null;
        this.selectedMultiSelectDocenteActividades = [];
        this.actividadesAcademicoSeleccionadas = [];
        this.actividadesInvestifacionSeleccionadas = [];
        this.actividadesVinculacionSeleccionadas = [];
        this.actividadesAdministrativoSeleccionadas = [];
        this.carService.getCarsMedium().then(cars => this.sourceCars = cars);
        this.targetCars = [];
        this.actividadSeleccionada = new Task();
    }

    ngOnInit() {
        this.cols = [
            {field: 'description', header: 'Descripción'},
            {field: 'start_time', header: 'Hora Inicio'},
            {field: 'end_time', header: 'Hora Fin'},
            {field: 'duration', header: 'Duración'},
        ];
        this.colsActividades = [
            {field: 'name', header: 'Actividad'},
            {field: 'percentage_advance', header: 'Porcentaje de Avance'},

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
        const parametros = '?user_id=' + this.user.id;
        this.service.get('workdays/all' + parametros).subscribe(
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
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.service.get('workdays/current_day' + parametros).subscribe(
            response => {
                if (response['data']) {
                    this.jornadaActividades = response['data']['attributes'];
                    this.fechaActual = new Date(response['meta']['current_day']);
                    let totalHorasTrabajadas = '00:00:00';
                    let totalHorasAlmuerzo = '00:00:00';
                    this.totalHorasTrabajadas = new Date();
                    this.totalHorasAlmuerzo = new Date();
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
                                if (actividad.end_time !== null) {
                                    totalHorasAlmuerzo = this.sumarHoras(actividad.duration, totalHorasAlmuerzo);
                                }
                            }
                        });

                        const duracionJornada = totalHorasTrabajadas.split(':');
                        let horas = Number(duracionJornada[0]);
                        let minutos = Number(duracionJornada[1]);
                        let segundos = Number(duracionJornada[2]);
                        this.totalHorasTrabajadas.setHours(horas);
                        this.totalHorasTrabajadas.setMinutes(minutos);
                        this.totalHorasTrabajadas.setSeconds(segundos);

                        const duracionAlmuerzo = totalHorasAlmuerzo.split(':');
                        horas = Number(duracionAlmuerzo[0]);
                        minutos = Number(duracionAlmuerzo[1]);
                        segundos = Number(duracionAlmuerzo[2]);
                        this.totalHorasAlmuerzo.setHours(horas);
                        this.totalHorasAlmuerzo.setMinutes(minutos);
                        this.totalHorasAlmuerzo.setSeconds(segundos);
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

        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.service.post('workdays' + parametros, {'attendance': attendance, 'workday': workday}).subscribe(
            response => {
                this.obtenerJornadaActividadesDiaria();
                this.message.add({key: 'tst', severity: 'success', summary: 'Se inició correctamente', detail: type});
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
                this.message.add({key: 'tst', severity: 'success', summary: 'Se finalizó correctamente', detail: workday.type.name});
                this.obtenerJornadaActividadesDiaria();
                this.obtenerJornadaActividadesTodos();
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    eliminarJornadaActividad(workday: Workday) {
        this.spinner.show();
        this.service.delete('workdays/' + workday.id).subscribe(
            response => {
                if (response) {
                    this.message.add({key: 'tst', severity: 'success', summary: 'Se eliminó correctamente', detail: workday.type.name});
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
        const segundoSuma = (segundoTotal + segundoParcial) > 60 ? segundoTotal + segundoParcial - 60 : segundoTotal + segundoParcial;

        return horaSuma + ':' + minutoSuma + ':' + segundoSuma;
    }

    guardarActividades(type: string) {

        // if (this.actividadesSeleccionadas.length > 0) {
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.service.post('tasks' + parametros, {'tasks': this.actividadesAcademicoSeleccionadas}).subscribe(
            response => {
                this.message.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se guardó correctamente',
                    detail: type,
                    life: type.length * 100
                });
                if (response['data']) {
                    response['data']['attributes'].forEach(actividad => {
                        if (actividad.type.code === 'academic') {
                            this.actividadesAcademicoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'administrative') {
                            this.actividadesAcademicoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'entailment') {
                            this.actividadesAcademicoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'investigation') {
                            this.actividadesAcademicoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                    });

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
        this.service.get('tasks/catalogues').subscribe(
            response => {
                if (response['data']['attributes']) {
                    this.docenteActividadesAcademicoItems = [];
                    this.docenteActividadesInvestigacionItems = [];
                    this.docenteActividadesVinculacionItems = [];
                    this.docenteActividadesAdministrativoItems = [];
                    response['data']['attributes'].forEach(docenteActividad => {
                            if (docenteActividad.code === 'academic') {
                                docenteActividad.tasks.forEach(actividad => {
                                    this.docenteActividadesAcademicoItems.push(
                                        {
                                            'type_id': actividad.id,
                                            'name': actividad.name,
                                            'description': '',
                                            'percentage_advance': 0
                                        }
                                    );
                                });

                            }
                            if (docenteActividad.code === 'administrative') {
                                docenteActividad.tasks.forEach(actividad => {
                                    this.docenteActividadesAdministrativoItems.push(
                                        {
                                            'type_id': actividad.id,
                                            'name': actividad.name,
                                            'description': '',
                                            'percentage_advance': 0
                                        }
                                    );
                                });

                            }
                            if (docenteActividad.code === 'entailment') {
                                docenteActividad.tasks.forEach(actividad => {
                                    this.docenteActividadesVinculacionItems.push(
                                        {
                                            'type_id': actividad.id,
                                            'name': actividad.name,
                                            'description': '',
                                            'percentage_advance': 0
                                        }
                                    );
                                });

                            }
                            if (docenteActividad.code === 'investigation') {
                                docenteActividad.tasks.forEach(actividad => {
                                    this.docenteActividadesInvestigacionItems.push(
                                        {
                                            'type_id': actividad.id,
                                            'name': actividad.name,
                                            'description': '',
                                            'percentage_advance': 0
                                        }
                                    );
                                });

                            }
                        }
                    );
                }
            }
        );
    }

    obtenerDocenteActividades() {
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.service.get('tasks/current_day' + parametros).subscribe(
            response => {
                if (response['data']) {
                    this.actividadesAcademicoSeleccionadas = [];
                    this.actividadesAdministrativoSeleccionadas = [];
                    this.actividadesVinculacionSeleccionadas = [];
                    this.actividadesInvestifacionSeleccionadas = [];
                    response['data']['attributes'].forEach(actividad => {
                        if (actividad.type.code === 'academic') {
                            this.actividadesAcademicoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'administrative') {
                            this.actividadesAdministrativoSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'entailment') {
                            this.actividadesVinculacionSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                        if (actividad.type.code === 'investigation') {
                            this.actividadesInvestifacionSeleccionadas.push({
                                'type_id': actividad.type_id,
                                'name': actividad.type.name,
                                'description': actividad.description,
                                'percentage_advance': actividad.percentage_advance
                            });
                        }
                    });
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    registrar() {
        this.message.add({
            key: 'tst',
            severity: 'success',
            summary: 'Se registró correctamente',
            detail: this.actividadSeleccionada.name
        });
        this.docenteActividadesAcademicoItems
            [this.docenteActividadesAcademicoItems.findIndex(element => element.type_id === this.actividadSeleccionada.type_id)]
            .percentage_advance = this.actividadSeleccionada.percentage_advance;
    }
}


