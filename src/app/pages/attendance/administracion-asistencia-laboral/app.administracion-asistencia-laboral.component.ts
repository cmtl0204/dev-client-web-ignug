import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../shared/breadcrumb/breadcrumb.service';
import {Car} from '../../../demo/domain/car';
import {SelectItem, TreeNode} from 'primeng/api';
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
    resumenAsistencias: any[];
    detalleAsistencias: any[];
    fechas: Date;
    sortField: string;
    sortOrder: number;
    sortOptions: SelectItem[];
    filterOptions: SelectItem[];
    sortKey: string;
    tipoFiltro: string;
    exportColumns: any[];
    workday: Workday;
    user: User;
    displayWorkday: boolean;
    selectedAttendance: any;
    categories: TreeNode[];
    selectedCategories: TreeNode[];

    constructor(private eventService: EventService, private nodeService: NodeService, private breadcrumbService: BreadcrumbService,
                private attendanceService: AttendanceServiceService, private spinner: NgxSpinnerService) {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.breadcrumbService.setItems([
            {label: 'Control Asistencia'}
        ]);
        this.docenteAsistencia = new Attendance();
        // this.fechas = [];
        this.sortOptions = [
            {label: 'Apellido', value: 'first_lastname'},
            {label: 'Hora Inicio', value: 'start_time'},
            {label: 'Hora Fin', value: 'end_time'}
        ];
        this.filterOptions = [
            {label: 'Apellido', value: 'first_lastname'},
            {label: 'Hora Inicio', value: 'start_time'},
            {label: 'Hora Fin', value: 'end_time'},
            {label: 'Duración', value: 'duration'}
        ];
        this.tipoFiltro = 'first_lastname';
        this.resumenAsistencias = [];
        this.detalleAsistencias = [];
        this.workday = new Workday();
    }

    ngOnInit() {
        this.cols = [
            {field: 'date', header: 'Fecha'},
            {field: 'identification', header: 'Identificación'},
            {field: 'first_lastname', header: 'Docente'},
            {field: 'type_workdays', header: 'Jornada/Almuerzo'},
            {field: 'start_time', header: 'Hora Inicio'},
            {field: 'end_time', header: 'Hora Fin'},
            {field: 'duration', header: 'Duración'},
        ];
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
        this.obtenerJornadaActividadesResumen();
        this.obtenerJornadaActividadesDetalle();
        this.fullCalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: new Date(),
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        };

    }

    obtenerJornadaActividadesResumen() {
        const currentDate = new Date();
        this.spinner.show();
        let parametros = '';

        if (this.fechas) {
            parametros = '?start_date='
                + this.fechas[0].getFullYear()
                + '-' + (this.fechas[0].getMonth() + 1)
                + '-' + this.fechas[0].getDate()
                + '&end_date='
                + this.fechas[1].getFullYear()
                + '-' + (this.fechas[1].getMonth() + 1)
                + '-' + this.fechas[1].getDate();
        } else {
            parametros = '?start_date=' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
                + '&end_date=' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        }
        this.attendanceService.get('attendances/summary' + parametros).subscribe(
            response => {
                if (response) {
                    this.resumenAsistencias = response['data']['attendances'];
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
            }
        );
    }

    obtenerJornadaActividadesDetalle() {
        const currentDate = new Date();
        this.spinner.show();
        let parametros = '';

        if (this.fechas) {
            parametros = '?start_date='
                + this.fechas[0].getFullYear()
                + '-' + (this.fechas[0].getMonth() + 1)
                + '-' + this.fechas[0].getDate()
                + '&end_date='
                + this.fechas[1].getFullYear()
                + '-' + (this.fechas[1].getMonth() + 1)
                + '-' + this.fechas[1].getDate();
        } else {
            parametros = '?start_date=' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
                + '&end_date=' + currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        }
        this.attendanceService.get('attendances/detail' + parametros).subscribe(
            response => {
                if (response) {
                    this.detalleAsistencias = response['data']['attendances'];
                    this.spinner.hide();
                }
            }, error => {
                this.spinner.hide();
            }
        );
    }

    updateWorkday(): void {
        const parameters = '?user_id=' + this.user.id;
        this.workday.id = this.selectedAttendance.workday_id;
        this.workday.start_time = this.selectedAttendance.start_time;
        this.workday.end_time = this.selectedAttendance.end_time;

        this.spinner.show();
        this.attendanceService.update('workdays' + parameters, {'workday': this.workday}).subscribe(
            response => {
                this.obtenerJornadaActividadesDetalle();
                this.spinner.hide();
            }, error => {
                this.obtenerJornadaActividadesDetalle();
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

    filtrarFechas() {
        if (this.fechas) {
            if (this.fechas[1] != null) {
                this.obtenerJornadaActividadesResumen();
                this.obtenerJornadaActividadesDetalle();
            }
        }
    }

    onSortChange(event) {
        const value = event.value;
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    cambiarFiltro(event) {

    }

    exportPdf() {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(x => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.detalleAsistencias);
                doc.save('asistencias.pdf');
            });
        });
    }

    exportExcel() {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.detalleAsistencias);
            const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, 'asistencias');
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

    selectAttendance(attedance) {
        this.selectedAttendance = attedance;
        this.workday.observations = '';
        if (this.selectedAttendance.observations) {
            this.selectedAttendance.observations = attedance.observations.split('##');
            let i = 0;
            this.selectedAttendance.observations.forEach(observation => {
                this.selectedAttendance.observations[i] = observation.split('#');
                i++;
            });
        }
    }
}

