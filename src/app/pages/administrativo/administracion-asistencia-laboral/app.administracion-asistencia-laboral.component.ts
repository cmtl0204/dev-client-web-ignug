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
    asistencias: any[];
    fechas: Date;

    constructor(private carService: CarService, private eventService: EventService, private nodeService: NodeService,
                private breadcrumbService: BreadcrumbService, private service: ServiceService, private spinner: NgxSpinnerService) {
        this.breadcrumbService.setItems([
            {label: 'Control Asistencia'}
        ]);
        this.docenteAsistencia = new Attendance();
        // this.fechas = [];
    }

    ngOnInit() {
        this.cols = [
            {field: 'date', header: 'Fecha'},
            {field: 'identification', header: 'Identificación'},
            {field: 'first_lastname', header: 'Docente'},
            {field: 'start_time', header: 'Hora Inicio'},
            {field: 'end_time', header: 'Hora Fin'},
        ];
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

    }

    obtenerJornadaActividadesTodos() {
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
        this.service.get('attendances/all' + parametros).subscribe(
            response => {
                if (response) {
                    this.asistencias = response['data']['attributes'];
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

    filtrarFechas() {
        if (this.fechas) {
            if (this.fechas[1] != null) {
                this.obtenerJornadaActividadesTodos();
            }
        }
    }
}

