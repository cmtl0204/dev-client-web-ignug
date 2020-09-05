import {Component, OnInit} from '@angular/core';
import {IgnugServiceService} from '../../../../services/ignug/ignug-service.service';
import {User} from '../../../../models/authentication/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardService} from '../../../../services/job-board/job-board-service.service';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-personal-information',
    templateUrl: './app-personal-information.component.html',
})
export class AppPersonalInformationComponent implements OnInit {
    displayUser: boolean; // para visualizar el modal nuevo usuario - modificiar usuario
    ethnicOrigins: SelectItem[]; // para almacenar el catalogo de las etnias
    cantones: SelectItem[]; // para almacenar el catalogo de las los cantones
    identificationTypes: SelectItem[]; // para almacenar el catalogo de los tipos de documento
    sexs: SelectItem[]; // para almacenar el catalogo de las sexos
    genders: SelectItem[]; // para almacenar el catalogo de las generos
    selectedUser: User; // para guardar el usuario seleccionado o para poder editar la informacion
    users: Array<User>; // para almacenar el listado de todos los usuarios
    colsUser: any[]; // para almacenar las columnas para la tabla usuarios
    headerDialogUser: string; // para cambiar de forma dinamica la cabecear del  modal de creacion o actualizacion de usuario
    userForm: FormGroup;
    validationBirthdate: string;

    constructor(private messageService: MessageService,
                private ignugService: IgnugServiceService,
                private jobBoardService: JobBoardService,
                private spinnerService: NgxSpinnerService,
                private authenticationService: AuthenticationServiceService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.buildFormUser();
        this.selectedUser = new User();
        this.users = new Array<User>();
        this.colsUser = [
            {field: 'identification', header: 'Cédula/Pasaporte'},
            {field: 'first_name', header: 'Primer Nombre'},
            {field: 'second_name', header: 'Segundo Nombre'},
            {field: 'first_lastname', header: 'Primer Apellido'},
            {field: 'second_lastname', header: 'Segundo Apellido'},
            {field: 'email', header: 'Correo Institucional'},
        ];
        const currentDate = new Date();
        this.validationBirthdate = (currentDate.getFullYear() - 70).toString() + ':' + currentDate.getFullYear().toString();
    }

    buildFormUser() {
        this.userForm = this.fb.group({
            first_name: ['', Validators.required],
            second_name: ['', Validators.required],
            first_lastname: ['', Validators.required],
            second_lastname: ['', Validators.required],
            identification: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
            ethnic_origin_id: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            location_id: ['', Validators.required],
            identification_type_id: ['', Validators.required],
            sex_id: ['', Validators.required],
            gender_id: ['', Validators.required],
            birthdate: ['', Validators.required],
            phone: ['', Validators.required],
        });
    }

    // Esta funcion se ejectuta apenas inicie el componente
    ngOnInit(): void {
        // this.getUsers(); // obtiene la lista de todos los usuarios
        this.getEthnicOrigins(); // obtiene la lista del catalogo de etnias
        this.getLocations(); // obtiene la lista del catalogo de ubicaciones para los cantones
        this.getIdentificationTypes(); // obtiene la lista del catalogo de tipos de documento
        this.getSexs(); // obtiene la lista del catalogo de sexos
        this.getGenders(); // obtiene la lista del catalogo de generos
    }

    // obtiene la lista del catalogo de etnias
    getEthnicOrigins(): void {
        const parameters = '?type=ethnic_origin';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const ethnicOrigins = response['data']['catalogues'];
                this.ethnicOrigins = [{label: 'Seleccione', value: ''}];
                ethnicOrigins.forEach(item => {
                    this.ethnicOrigins.push({label: item.name, value: item.id});
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

    getIdentificationTypes(): void {
        const parameters = '?type=identification_type';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const identificationTypes = response['data']['catalogues'];
                this.identificationTypes = [{label: 'Seleccione', value: ''}];
                identificationTypes.forEach(item => {
                    this.identificationTypes.push({label: item.name, value: item.id});
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

    getSexs(): void {
        const parameters = '?type=sex';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const sexs = response['data']['catalogues'];
                this.sexs = [{label: 'Seleccione', value: ''}];
                sexs.forEach(item => {
                    this.sexs.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Sexos',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getGenders(): void {
        const parameters = '?type=gender';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const genders = response['data']['catalogues'];
                this.genders = [{label: 'Seleccione', value: ''}];
                genders.forEach(item => {
                    this.genders.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Géneros',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    getLocations(): void {
        const parameters = '?type=canton';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const cantones = response['data']['catalogues'];
                this.cantones = [{label: 'Seleccione', value: ''}];
                cantones.forEach(item => {
                    this.cantones.push({label: item.name, value: item.id});
                });

            }, error => {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Oops! Problemas al cargar el catálogo Cantones',
                    detail: 'Vuelve a intentar más tarde',
                    life: 5000
                });
            });
    }

    selectUser(user: User): void {
        if (user) {
            this.selectedUser = user;
            this.userForm.controls['first_name'].setValue(user.first_name);
            this.userForm.controls['second_name'].setValue(user.first_name);
            this.userForm.controls['first_lastname'].setValue(user.first_lastname);
            this.userForm.controls['second_lastname'].setValue(user.second_lastname);
            this.userForm.controls['identification'].setValue(user.identification);
            this.userForm.controls['ethnic_origin_id'].setValue(user.ethnic_origin.id);
            this.userForm.controls['email'].setValue(user.email);
            this.userForm.controls['location_id'].setValue(user.location.id);
            this.userForm.controls['identification_type_id'].setValue(user.identification_type.id);
            this.userForm.controls['sex_id'].setValue(user.sex.id);
            this.userForm.controls['gender_id'].setValue(user.gender.id);
            this.userForm.controls['birthdate'].setValue(user.birthdate);
            this.headerDialogUser = 'Modificar Usuario';
        } else {
            this.selectedUser = new User();
            this.userForm.reset();
            this.headerDialogUser = 'Nuevo Usuario';
        }
        this.displayUser = true;
    }

    getUser(): User {
        return {
            identification: this.userForm.controls['identification'].value,
            first_name: this.userForm.controls['first_name'].value,
            second_name: this.userForm.controls['second_name'].value,
            first_lastname: this.userForm.controls['first_lastname'].value,
            second_lastname: this.userForm.controls['second_lastname'].value,
            ethnic_origin: {id: this.userForm.controls['ethnic_origin_id'].value},
            location: {id: this.userForm.controls['location_id'].value},
            identification_type: {id: this.userForm.controls['identification_type_id'].value},
            sex: {id: this.userForm.controls['sex_id'].value},
            gender: {id: this.userForm.controls['gender_id'].value},
            birthdate: this.userForm.controls['birthdate'].value,
            email: this.userForm.controls['email'].value,
        } as User;
    }

    onSubmitUser(event: Event) {
        event.preventDefault();
        if (this.userForm.valid) {
            console.log(event);
        } else {
            this.userForm.markAllAsTouched();
        }


    }
}
