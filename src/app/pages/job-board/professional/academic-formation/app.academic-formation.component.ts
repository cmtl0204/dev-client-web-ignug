import {Component, OnInit} from '@angular/core';
import {AcademicFormation} from 'src/app/models/job-board/models.index';
import {IgnugServiceService} from '../../../../services/ignug/ignug-service.service';
import {JobBoardService} from 'src/app/services/job-board/job-board-service.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {TableModule} from 'primeng/table';

@Component({
    selector: 'app-academic-formation',
    templateUrl: './app.academic-formation.component.html'
})
export class AppAcademicFormationComponent implements OnInit {
    displayUser: boolean; // para visualizar el modal nuevo usuario - modificiar usuario
    institutions: SelectItem[]; // para almacenar el catálogo de las instituciones
    careers: SelectItem[]; // para almacenar el catálogo de las las carreras
    professionalDegrees: SelectItem[]; // para almacenar el catálogo de los títulos otorgados
    registrationDates: SelectItem[]; // para almacenar las fechas
    senescytCodes: SelectItem[]; // para almacenar el catálogo de las generos
    hasTitling: boolean; // para guardar si tiene título o no
    academicFormations: Array<AcademicFormation>; // para almacenar el listado de Formación Académica
    selectedAcademicFormation: AcademicFormation; // para guardar el usuario seleccionado o para poder editar la informacion
    colsAcademicFormation: any[]; // para almacenar las columnas para la tabla Formación Académica
    headerDialogUser: string; // para cambiar de forma dinámica la cabecear del  modal de creación o actualización de usuario
    academicFormationForm: FormGroup;

    constructor(private messageService: MessageService,
                private ignugService: IgnugServiceService,
                private jobBoardService: JobBoardService,
                private spinnerService: NgxSpinnerService,
                private authenticationService: AuthenticationServiceService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.selectedAcademicFormation = new AcademicFormation();
        this.academicFormations = new Array<AcademicFormation>();
        this.colsAcademicFormation = [
            {field: 'institution_id', header: 'Institución'},
            {field: 'career_id', header: 'Carrera'},
            {field: 'professional_degree_id', header: 'Título'},
            {field: 'registration_date', header: 'Fecha de Registro'},
            {field: 'senescyt_code', header: 'Cód. de Reg. Senescyt'},
        ];

        this.academicFormationForm = this.fb.group({
            'institution_id': new FormControl('', Validators.required),
            'career_id': new FormControl('', Validators.required),
            'professional_degree_id': new FormControl('', Validators.required),
            'registration_date': new FormControl('', Validators.required),
            'senescyt_code': new FormControl('', Validators.required),
        });
    }

// Esta función se ejectuta apenas inicie el componente
    ngOnInit(): void {
        this.getInstitutions(); // obtiene la lista de todos los instituciones
        this.getCareers(); // obtiene la lista del catalogo de carreras
        this.getProfessionalDegrees(); // obtiene la lista del título poseedor
        this.getRegistrationDates(); // obtiene fechas de registro
        this.getSenescytCodes(); // obtiene códigos senescyt
    }


    //Métodos
    getInstitutions(): void {
        const parameters = '?type=institution';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const institutions = response['data']['catalogues'];
                this.institutions = [{label: 'Seleccione', value: ''}];
                institutions.forEach(item => {
                    this.institutions.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo de Instituciones',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getCareers(): void {
        const parameters = '?type=career';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const careers = response['data']['catalogues'];
                this.careers = [{label: 'Seleccione', value: ''}];
                careers.forEach(item => {
                    this.careers.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo de Carreras',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getProfessionalDegrees(): void {
        const parameters = '?type=professional_degree';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const professionalDegrees = response['data']['catalogues'];
                this.professionalDegrees = [{label: 'Seleccione', value: ''}];
                professionalDegrees.forEach(item => {
                    this.professionalDegrees.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Títulos profesionales',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getRegistrationDates(): void {
        const parameters = '?type=registration_date';
        this.ignugService.get('date' + parameters).subscribe(
            response => {
                const registrationDates = response['data']['date'];
                this.registrationDates = [{label: 'Seleccione', value: ''}];
                registrationDates.forEach(item => {
                    this.registrationDates.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getSenescytCodes(): void {
        const parameters = '?type=senescyt_code';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const senescytCodes = response['data']['catalogues'];
                this.senescytCodes = [{label: 'Seleccione', value: ''}];
                senescytCodes.forEach(item => {
                    this.senescytCodes.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getAcademicFormations() {
        this.spinnerService.show();
        this.authenticationService.get('auth/users').subscribe(
            response => {
                this.spinnerService.hide();
                this.academicFormations = response['data']['users'];
            }, error => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas con el servidor',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    selectAcademicFormation(academicFormation: AcademicFormation): void {
        if (academicFormation) {
            this.selectedAcademicFormation = academicFormation;
            this.academicFormationForm.controls['institution_id'].setValue(academicFormation.category.id);
            this.academicFormationForm.controls['professional_degree_id'].setValue(academicFormation.professional_degree.id);
            this.academicFormationForm.controls['registration_date'].setValue(academicFormation.registration_date);
            this.academicFormationForm.controls['senescyt_code'].setValue(academicFormation.senescyt_code);
            this.headerDialogUser = 'Modificar Usuario';
        } else {
            this.selectedAcademicFormation = new AcademicFormation();
            this.academicFormationForm.reset();
            this.headerDialogUser = 'Nuevo Usuario';
        }
        this.displayUser = true;
    }
}


