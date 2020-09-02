import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {Car} from '../../../demo/domain/car';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CarService} from '../../../demo/service/carservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventService} from '../../../demo/service/eventservice';
import {NodeService} from '../../../demo/service/nodeservice';
import {AttendanceServiceService} from '../../../services/attendance/attendance-service.service';
import {Attendance} from '../../../models/attendance/attendance';
import {Workday} from '../../../models/attendance/workday';
import {Catalogue} from '../../../models/attendance/catalogue';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../../models/authentication/user';
import {Task} from '../../../models/attendance/task';
import {Router} from '@angular/router';
import {Role} from '../../../models/authentication/role';


@Component({
    selector: 'app-asistencia-laboral',
    templateUrl: './app.asistencia-laboral.component.html',
    styleUrls: ['app.asistencia-laboral.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService]
})

export class AppAsistenciaLaboralComponent implements OnInit {
    docenteActividadesAcademicoItems: any[];
    docenteActividadesInvestigacionItems: any[];
    docenteActividadesVinculacionItems: any[];
    docenteActividadesAdministrativoItems: any[];
    docenteActividadesRectorItems: any[];
    docenteActividadesVicerrectorItems: any[];
    docenteActividadesConserjeItems: any[];
    selectedMultiSelectDocenteActividades: string[];
    actividadesAcademicoSeleccionadas: any[];
    actividadesInvestifacionSeleccionadas: any[];
    actividadesVinculacionSeleccionadas: any[];
    actividadesAdministrativoSeleccionadas: any[];

    cols: any[];
    colsActividades: any[];
    colsHistoricoActividades: any[];
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
    role: Role;
    totalAlmuerzos: number;
    totalJornadas: number;
    historicoActividades: Array<Task>;
    fechas: Date;
    exportColumns: any[];

    constructor(private message: MessageService,
                private carService: CarService,
                private eventService: EventService,
                private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService,
                private attendanceService: AttendanceServiceService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private confirmationService: ConfirmationService) {
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
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
        this.totalAlmuerzos = 0;
        this.totalJornadas = 0;
        this.historicoActividades = new Array<Task>();
        this.fechaActual = new Date();
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
        this.colsHistoricoActividades = [
            {field: 'date', header: 'Fecha'},
            {field: 'name', header: 'Actividad'}

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
        this.obtenerJornadaActividadesHistorico();
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    }

    obtenerJornadaActividadesTodos() {
        this.spinner.show();
        const parametros = '?user_id=' + this.user.id;
        this.attendanceService.get('workdays/all' + parametros).subscribe(
            response => {
                if (response) {
                    const asistencias = response['data']['attributes'];
                    const actividades = new Array();
                    let i = 1;
                    asistencias.forEach(asistencia => {
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
                if (error.status === 401) {
                    this.router.navigate(['/authentication/login']);
                }
            }
        );
    }

    obtenerJornadaActividadesDiaria() {
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.attendanceService.get('workdays/current_day' + parametros).subscribe(
            response => {
                if (response['data']) {
                    this.jornadaActividades = response['data']['attributes'];
                    this.fechaActual = new Date(response['meta']['current_day']);
                    let totalHorasTrabajadas = '00:00:00';
                    let totalHorasAlmuerzo = '00:00:00';
                    this.totalHorasTrabajadas = new Date();
                    this.totalHorasAlmuerzo = new Date();
                    this.totalAlmuerzos = 0;
                    this.totalJornadas = 0;
                    if (this.jornadaActividades) {
                        this.jornadaActividades.forEach(actividad => {
                            if (actividad.type.code === 'work') {
                                this.totalJornadas++;
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
                                this.totalAlmuerzos++;
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
                        this.calcularTotalHorasTrabajadas();
                    }
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    obtenerJornadaActividadesHistorico() {
        let parametros = '?user_id=' + this.user.id;
        if (this.fechas) {
            parametros += '&start_date='
                + this.fechas[0].getFullYear()
                + '-' + (this.fechas[0].getMonth() + 1)
                + '-' + this.fechas[0].getDate()
                + '&end_date='
                + this.fechas[1].getFullYear()
                + '-' + (this.fechas[1].getMonth() + 1)
                + '-' + this.fechas[1].getDate();
        } else {
            const diaAnterior = this.fechaActual.getDate() - 1;
            parametros += '&start_date=' + this.fechaActual.getFullYear() + '-' + (this.fechaActual.getMonth() + 1) + '-' + diaAnterior
                + '&end_date=' + this.fechaActual.getFullYear() + '-' + (this.fechaActual.getMonth() + 1) + '-' + diaAnterior;
        }

        this.spinner.show();
        this.attendanceService.get('tasks/history' + parametros).subscribe(
            response => {
                if (response['data']) {
                    this.historicoActividades = response['data']['attributes'];
                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
            }
        );
    }

    iniciarDocenteAsistencia(type: string, description: string, icon: string) {
        this.confirmationService.confirm({
            header: 'Inicio de ' + description, message: '¿Estás seguro de iniciar tu ' + description + '?',
            'icon': icon,
            accept: () => {
                const horaActual = new Date();
                const horas =
                    horaActual.getHours().toString().length === 1 ? '0' + horaActual.getHours() : horaActual.getHours().toString();
                const minutos =
                    horaActual.getMinutes().toString().length === 1 ? '0' + horaActual.getMinutes() : horaActual.getMinutes().toString();
                const segundos =
                    horaActual.getSeconds().toString().length === 1 ? '0' + horaActual.getSeconds() : horaActual.getSeconds().toString();
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
                this.attendanceService.post('workdays/start_day' + parametros, {'attendance': attendance, 'workday': workday}).subscribe(
                    response => {
                        this.obtenerJornadaActividadesDiaria();
                        this.message.add({key: 'tst', severity: 'success', summary: 'Se inició correctamente', detail: type});
                        this.spinner.hide();
                    }, error => {
                        this.spinner.hide();
                        if (error.status === 401) {
                            this.router.navigate(['/authentication/login']);
                        }
                    }
                );
            }
        });
    }

    finalizarDocenteAsistencia(workday: Workday) {
        this.confirmationService.confirm({
            header: 'Finzalizar ' + workday.type.name,
            message: 'Revisa tus actividades antes de finalizar tu jornada ¿Estás seguro de finalizar?',
            acceptButtonStyleClass: 'ui-button-danger',
            icon: workday.type.icon,
            accept: () => {
                const horaActual = new Date();
                const horas =
                    horaActual.getHours().toString().length === 1 ? '0' + horaActual.getHours() : horaActual.getHours().toString();
                const minutos =
                    horaActual.getMinutes().toString().length === 1 ? '0' + horaActual.getMinutes() : horaActual.getMinutes().toString();
                const segundos =
                    horaActual.getSeconds().toString().length === 1 ? '0' + horaActual.getSeconds() : horaActual.getSeconds().toString();
                workday.observations = '';
                workday.end_time = horas + ':' + minutos + ':' + segundos;
                this.spinner.show();
                this.attendanceService.update('workdays/end_day', {'workday': workday}).subscribe(
                    response => {
                        this.message.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se finalizó correctamente',
                            detail: workday.type.name
                        });
                        this.obtenerJornadaActividadesDiaria();
                        this.obtenerJornadaActividadesTodos();
                        this.calcularTotalHorasTrabajadas();
                        this.spinner.hide();
                    }, error => {
                        this.spinner.hide();
                        if (error.status === 401) {
                            this.router.navigate(['/authentication/login']);
                        }
                    }
                );
            }
        });

    }

    eliminarJornadaActividad(workday: Workday) {
        this.confirmationService.confirm({
            header: 'Eliminar ' + workday.type.name, message: '¿Está seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            icon: workday.type.icon,
            accept: () => {
                this.spinner.show();
                this.attendanceService.delete('workdays/' + workday.id).subscribe(
                    response => {
                        if (response) {
                            this.message.add({
                                key: 'tst',
                                severity: 'success',
                                summary: 'Se eliminó correctamente',
                                detail: workday.type.name
                            });
                            this.obtenerJornadaActividadesTodos();
                            this.obtenerJornadaActividadesDiaria();
                            this.spinner.hide();
                        }
                    }, error => {
                        this.spinner.hide();
                        if (error.status === 401) {
                            this.router.navigate(['/authentication/login']);
                        }
                    }
                );
            }
        });

    }

    eliminarTask() {
        this.confirmationService.confirm({
            header: 'Eliminar Actividad', message: '¿Está seguro de eliminar la actividad?',
            acceptButtonStyleClass: 'ui-button-danger',
            icon: 'pi pi-list',
            accept: () => {
                this.spinner.show();
                this.attendanceService.delete('tasks/' + this.actividadSeleccionada.id).subscribe(
                    response => {
                        if (response) {
                            this.message.add({
                                key: 'tst',
                                severity: 'success',
                                summary: 'Se eliminó correctamente',
                                detail: this.actividadSeleccionada.name
                            });
                            this.obtenerCatalogoDocenteActividades();
                            this.spinner.hide();
                        }
                    }, error => {
                        this.spinner.hide();
                        if (error.status === 401) {
                            this.router.navigate(['/authentication/login']);
                        }
                    }
                );
            }
        });

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

    calcularTotalHorasTrabajadas() {
        const fecha = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth(), this.fechaActual.getDate(),
            this.totalHorasTrabajadas.getHours(), this.totalHorasTrabajadas.getMinutes(), this.totalHorasTrabajadas.getSeconds());

        fecha.setHours(fecha.getHours() - this.totalHorasAlmuerzo.getHours());
        fecha.setMinutes(fecha.getMinutes() - this.totalHorasAlmuerzo.getMinutes());
        fecha.setSeconds(fecha.getSeconds() - this.totalHorasAlmuerzo.getSeconds());
        this.totalHorasTrabajadas = fecha;
    }

    guardarActividades() {
        // if (this.actividadesSeleccionadas.length > 0) {
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.attendanceService.post('tasks' + parametros, {'task': this.actividadSeleccionada}).subscribe(
            response => {
                this.message.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se guardó correctamente',
                    detail: this.actividadSeleccionada.percentage_advance + '% ' + this.actividadSeleccionada.name,
                    life: this.actividadSeleccionada.name.length * 100
                });
                this.obtenerCatalogoDocenteActividades();
                this.obtenerJornadaActividadesHistorico();
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
                this.message.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops ocurrió un problema!',
                    detail: 'Inténtalo de nuevo',
                    life: 5000
                });
                if (error.status === 401) {
                    this.router.navigate(['/authentication/login']);
                }

                if (error.status === 404) {
                    this.message.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Oops ocurrió un problema!',
                        detail: 'Revisa que hayas iniciado tu jornada',
                        life: 5000
                    });
                }
            }
        );
        // }
    }

    obtenerCatalogoDocenteActividades() {
        this.attendanceService.get('tasks/catalogues').subscribe(
            response => {
                if (response['data']['attributes']) {
                    const parametros = '?user_id=' + this.user.id;
                    this.attendanceService.get('tasks/current_day' + parametros).subscribe(
                        response2 => {
                            this.docenteActividadesAcademicoItems = [];
                            this.docenteActividadesInvestigacionItems = [];
                            this.docenteActividadesVinculacionItems = [];
                            this.docenteActividadesAdministrativoItems = [];
                            this.docenteActividadesRectorItems = [];
                            this.docenteActividadesVicerrectorItems = [];
                            this.docenteActividadesConserjeItems = [];
                            response['data']['attributes'].forEach(docenteActividad => {
                                    if (docenteActividad.code === 'academic') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesAcademicoItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                    if (docenteActividad.code === 'rector') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesRectorItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                    if (docenteActividad.code === 'vicerrector') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesVicerrectorItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });
                                    }
                                    if (docenteActividad.code === 'concierge') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesConserjeItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                }
                            );
                            if (response2['data']) {
                                response2['data']['attributes'].forEach(actividadDocente => {
                                    const indiceActividadesAcademico = this.docenteActividadesAcademicoItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesAdministrativo = this.docenteActividadesAdministrativoItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesVinculacion = this.docenteActividadesVinculacionItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesInvestigacion = this.docenteActividadesInvestigacionItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesRector = this.docenteActividadesRectorItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesVicerrector = this.docenteActividadesVicerrectorItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    const indiceActividadesConserje = this.docenteActividadesConserjeItems
                                        .findIndex(element => element.type_id === actividadDocente.type_id);
                                    if (indiceActividadesAcademico >= 0) {
                                        this.docenteActividadesAcademicoItems[indiceActividadesAcademico]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesAcademicoItems[indiceActividadesAcademico]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesAcademicoItems[indiceActividadesAcademico]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesAdministrativo >= 0) {
                                        this.docenteActividadesAdministrativoItems[indiceActividadesAdministrativo]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesAdministrativoItems[indiceActividadesAdministrativo]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesAdministrativoItems[indiceActividadesAdministrativo]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesVinculacion >= 0) {
                                        this.docenteActividadesVinculacionItems[indiceActividadesVinculacion]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesVinculacionItems[indiceActividadesVinculacion]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesVinculacionItems[indiceActividadesVinculacion]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesInvestigacion >= 0) {
                                        this.docenteActividadesInvestigacionItems[indiceActividadesInvestigacion]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesInvestigacionItems[indiceActividadesInvestigacion]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesInvestigacionItems[indiceActividadesInvestigacion]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesRector >= 0) {
                                        this.docenteActividadesRectorItems[indiceActividadesRector]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesRectorItems[indiceActividadesRector]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesRectorItems[indiceActividadesRector]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesVicerrector >= 0) {
                                        this.docenteActividadesVicerrectorItems[indiceActividadesVicerrector]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesVicerrectorItems[indiceActividadesVicerrector]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesVicerrectorItems[indiceActividadesVicerrector]['id']
                                            = actividadDocente['id'];
                                    }
                                    if (indiceActividadesConserje >= 0) {
                                        this.docenteActividadesConserjeItems[indiceActividadesConserje]['description']
                                            = actividadDocente['description'];
                                        this.docenteActividadesConserjeItems[indiceActividadesConserje]['percentage_advance']
                                            = actividadDocente['percentage_advance'];
                                        this.docenteActividadesConserjeItems[indiceActividadesConserje]['id']
                                            = actividadDocente['id'];
                                    }
                                });
                            }
                            this.spinner.hide();
                        }, error => {
                            this.docenteActividadesAcademicoItems = [];
                            this.docenteActividadesInvestigacionItems = [];
                            this.docenteActividadesVinculacionItems = [];
                            this.docenteActividadesAdministrativoItems = [];
                            this.docenteActividadesRectorItems = [];
                            this.docenteActividadesVicerrectorItems = [];
                            this.docenteActividadesConserjeItems = [];
                            response['data']['attributes'].forEach(docenteActividad => {
                                    if (docenteActividad.code === 'academic') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesAcademicoItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
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
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                    if (docenteActividad.code === 'rector') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesRectorItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                    if (docenteActividad.code === 'vicerrector') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesVicerrectorItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });
                                    }
                                    if (docenteActividad.code === 'concierge') {
                                        docenteActividad.tasks.forEach(actividad => {
                                            this.docenteActividadesConserjeItems.push(
                                                {
                                                    'type_id': actividad.id,
                                                    'name': actividad.name,
                                                    'description': '',
                                                    'percentage_advance': null
                                                }
                                            );
                                        });

                                    }
                                }
                            );
                            this.spinner.hide();
                        }
                    );
                }
            }, error => {
                if (error.status === 401) {
                    this.router.navigate(['/authentication/login']);
                }
            }
        );
    }

    obtenerDocenteActividades() {
        const parametros = '?user_id=' + this.user.id;
        this.spinner.show();
        this.attendanceService.get('tasks/current_day' + parametros).subscribe(
            response => {
                if (response['data']) {

                }
                this.spinner.hide();
            }, error => {
                this.spinner.hide();
                if (error.status === 401) {
                    this.router.navigate(['/authentication/login']);
                }
            }
        );
    }

    filtrarFechas() {
        if (this.fechas) {
            if (this.fechas[1] != null) {
                this.obtenerJornadaActividadesHistorico();
            }
        }
    }

    exportPdf() {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(x => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.historicoActividades);
                doc.save('actividades.pdf');
            });
        });
    }

    exportExcel() {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.historicoActividades);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, 'actividades');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

}


