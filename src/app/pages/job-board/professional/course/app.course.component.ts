import {Component, OnInit} from '@angular/core';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {Course} from '../../../../models/job-board/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-course',
    templateUrl: './app.course.component.html',
})
export class AppCourseComponent implements OnInit {
    displayCourse: boolean; // para visualizar el modal nuevo usuario - modificiar usuario
    eventTypes: SelectItem[]; // para almacenar el catalogo de las etnias
    typeCertifications: SelectItem[]; // para almacenar el catalogo de las los cantones
    selectedCourse: Course; // para guardar el usuario seleccionado o para poder editar la informacion
    courses: Array<Course>; // para almacenar el listado de todos los usuarios
    institutions: SelectItem[];
    colsCourse: any[]; // para almacenar las columnas para la tabla usuarios
    headerDialogCourse: string; // para cambiar de forma dinamica la cabecear del  modal de creacion o actualizacion de usuario
    courseForm: FormGroup;
    validationBirthdate: string;
    validationStart_date: string;
    validationFinish_date: string;

    constructor(private messageService: MessageService,
                private jobBoardService: JobBoardService,
                private spinnerService: NgxSpinnerService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.buildFormCourse();
        this.selectedCourse = new Course();
        this.courses = new Array<Course>();
        this.colsCourse = [
            {field: 'institution', header: 'Institución'},
            {field: 'event_type', header: 'Tipo'},
            {field: 'event_name', header: 'Descripción'},
            {field: 'type_certification', header: 'Certificado'},
            {field: 'hours', header: 'Horas'},
        ];
        const currentDate = new Date();
        this.validationStart_date = (currentDate.getFullYear() - 70).toString() + ':' + currentDate.getFullYear().toString();
        this.validationFinish_date = (currentDate.getFullYear() - 70).toString() + ':' + currentDate.getFullYear().toString();
    }

    buildFormCourse() {
        this.courseForm = this.fb.group({
            institution_id: ['', Validators.required],
            event_type_id: ['', Validators.required],
            event_name: ['', Validators.required],
            start_date: ['', Validators.required],
            finish_date: ['', Validators.required],
            hours: ['', Validators.required],
            type_certification_id: ['', Validators.required],

        });
    }

    // Esta funcion se ejectuta apenas inicie el componente
    ngOnInit(): void {
        this.getCourses();
        this.getInstitutions();
        this.getEventTypes();
        this.getTypeCertifications();
    }

    // obtiene la lista del catalogo de tipo de evento
    getEventTypes(): void {
        const parameters = '?type=event_type';
        this.jobBoardService.get('catalogues' + parameters).subscribe(
            response => {
                const eventTypes = response['data']['catalogues'];
                this.eventTypes = [{label: 'Seleccione', value: ''}];
                eventTypes.forEach(item => {
                    this.eventTypes.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Etninas',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getInstitutions(): void {
        const parameters = '?type=institution';
        this.jobBoardService.get('catalogues' + parameters).subscribe(
            response => {
                const institution = response['data']['catalogues'];
                this.institutions = [{label: 'Seleccione', value: ''}];
                institution.forEach(item => {
                    this.institutions.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Tipos de Documentos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getTypeCertifications(): void {
        const parameters = '?type=type_certification';
        this.jobBoardService.get('catalogues' + parameters).subscribe(
            response => {
                const typeCertifications = response['data']['catalogues'];
                this.typeCertifications = [{label: 'Seleccione', value: ''}];
                typeCertifications.forEach(item => {
                    this.typeCertifications.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Tipos de Documentos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getCourses() {
        this.spinnerService.show();
        this.jobBoardService.get('job-board/courses').subscribe(
            response => {
                this.spinnerService.hide();
                this.courses = response['data']['courses'];
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

    createCourse() {
        this.selectedCourse = this.getCourse();
        this.spinnerService.show();
        this.jobBoardService.post('job-board/course', {'course': this.selectedCourse}).subscribe(
            response => {
                this.courses.unshift(this.selectedCourse);

                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedCourse.event_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    updateCourse() {
        this.selectedCourse = this.getCourse();
        this.spinnerService.show();
        this.jobBoardService.update('courses', {'course': this.selectedCourse}).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedCourse.event_name,
                    life: 3000
                });
                this.displayCourse = false;
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

    deleteCourse(course: Course) {
        this.confirmationService.confirm({
            header: 'Eliminar ',
            message: '¿Estás seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-primary',
            icon: 'pi pi-trash',
            accept: () => {
                this.spinnerService.show();
                this.jobBoardService.delete('job-board/courses/' + course.id).subscribe(
                    response => {
                        const indiceCourse = this.courses
                            .findIndex(element => element.id === course.id);
                        this.courses.splice(indiceCourse, 1);
                        this.spinnerService.hide();
                        this.messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            life: 3000
                        });
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
        });

    }

    selectCourse(course: Course): void {
        if (course) {
            this.selectedCourse = course;
            this.courseForm.controls['institution_id'].setValue(course.institution.id);
            this.courseForm.controls['event_type_id'].setValue(course.event_type.id);
            this.courseForm.controls['event_name'].setValue(course.event_name);
            this.courseForm.controls['start_date'].setValue(course.start_date);
            this.courseForm.controls['finish_date'].setValue(course.end_date);
            this.courseForm.controls['hours'].setValue(course.hours);
            this.courseForm.controls['type_certification_id'].setValue(course.type_certification.id);
            this.headerDialogCourse = 'Modificar Curso';
        } else {
            this.selectedCourse = new Course();
            this.courseForm.reset();
            this.headerDialogCourse = 'Nuevo Curso';
        }
        this.displayCourse = true;
    }

    getCourse(): Course {
        return {
            institution: {id: this.courseForm.controls['institution_id'].value},
            event_type: {id: this.courseForm.controls['event_type_id'].value},
            event_name: this.courseForm.controls['event_name'].value,
            start_date: this.courseForm.controls['start_date'].value,
            end_date: this.courseForm.controls['finish_date'].value,
            hours: this.courseForm.controls['hours'].value,
            type_certification: {id: this.courseForm.controls['type_certification_id'].value},
        } as Course;
    }

    onSubmitCourse(event: Event) {
        event.preventDefault();
        if (this.courseForm.valid) {
            console.log(event);
        } else {
            this.courseForm.markAllAsTouched();
        }

    }
}
