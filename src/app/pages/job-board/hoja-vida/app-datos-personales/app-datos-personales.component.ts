import {Component, OnInit} from '@angular/core';
import {IgnugServiceService} from '../../../../services/ignug/ignug-service.service';
import {User} from '../../../../models/authentication/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardServiceService} from '../../../../services/job-board/job-board-service.service';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-datos-personales',
    templateUrl: './app-datos-personales.component.html',
})
export class AppDatosPersonalesComponent implements OnInit {
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
    userform: FormGroup;

    constructor(private messageService: MessageService,
                private ignugService: IgnugServiceService,
                private jobBoardService: JobBoardServiceService,
                private spinnerService: NgxSpinnerService,
                private authenticationService: AuthenticationServiceService,
                private confirmationService: ConfirmationService,
                private fb: FormBuilder) {
        this.selectedUser = new User();
        this.users = new Array<User>();
        this.colsUser = [
            {field: 'identification', header: 'Cédula/Pasaporte'},
            {field: 'first_name', header: 'Nombre'},
            {field: 'first_lastname', header: 'Apellido'},
            {field: 'email', header: 'Correo Institucional'},
        ];
        this.userform = this.fb.group({
            'first_name': new FormControl('', Validators.required),
            'first_lastname': new FormControl('', Validators.required),
            'identification': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
            'ethnic_origin_id': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'location_id': new FormControl('', Validators.required),
            'identification_type_id': new FormControl('', Validators.required),
            'sex_id': new FormControl('', Validators.required),
            'gender_id': new FormControl('', Validators.required),
            'birthdate': new FormControl('', Validators.required),
            // 'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),

        });
    }

    // Esta funcion se ejectuta apenas inicie el componente
    ngOnInit(): void {
        this.getUsers(); // obtiene la lista de todos los usuarios
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
                this.ethnicOrigins = [{label: 'Seleccione Etnia', value: 0}];
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
                this.identificationTypes = [{label: 'Seleccione Tipo de Documento', value: 0}];
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
                this.sexs = [{label: 'Seleccione Sexo', value: 0}];
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
                this.genders = [{label: 'Seleccione Género', value: 0}];
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
                this.cantones = [{label: 'Seleccione cantón', value: 0}];
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

    getUsers() {
        this.spinnerService.show();
        this.authenticationService.get('auth/users').subscribe(
            response => {
                this.spinnerService.hide();
                this.users = response['data']['users'];
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

    createUser() {
        this.selectedUser.identification = this.userform.controls['identification'].value;
        this.selectedUser.first_name = this.userform.controls['first_name'].value;
        this.selectedUser.first_lastname = this.userform.controls['first_lastname'].value;
        this.selectedUser.ethnic_origin.id = this.userform.controls['ethnic_origin_id'].value;
        this.selectedUser.location.id = this.userform.controls['location_id'].value;
        this.selectedUser.identification_type.id = this.userform.controls['identification_type_id'].value;
        this.selectedUser.sex.id = this.userform.controls['sex_id'].value;
        this.selectedUser.gender.id = this.userform.controls['gender_id'].value;
        this.selectedUser.birthdate = this.userform.controls['birthdate'].value;
        this.selectedUser.email = this.userform.controls['email'].value;
        this.selectedUser.user_name = this.selectedUser.identification;
        this.selectedUser.password = '123';
        this.spinnerService.show();
        this.authenticationService.post('auth/users', {'user': this.selectedUser}).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedUser.first_lastname + ' ' + this.selectedUser.first_name,
                    life: 3000
                });
                this.displayUser = false;
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

    updateUser() {
        this.selectedUser.identification = this.userform.controls['identification'].value;
        this.selectedUser.first_name = this.userform.controls['first_name'].value;
        this.selectedUser.first_lastname = this.userform.controls['first_lastname'].value;
        this.selectedUser.ethnic_origin.id = this.userform.controls['ethnic_origin_id'].value;
        this.selectedUser.location.id = this.userform.controls['location_id'].value;
        this.selectedUser.identification_type.id = this.userform.controls['identification_type_id'].value;
        this.selectedUser.sex.id = this.userform.controls['sex_id'].value;
        this.selectedUser.gender.id = this.userform.controls['gender_id'].value;
        this.selectedUser.birthdate = this.userform.controls['birthdate'].value;
        this.selectedUser.email = this.userform.controls['email'].value;
        this.selectedUser.user_name = this.selectedUser.identification;
        this.spinnerService.show();
        this.authenticationService.update('auth/users', {'user': this.selectedUser}).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedUser.first_lastname + ' ' + this.selectedUser.first_name,
                    life: 3000
                });
                this.displayUser = false;
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

    deleteUser(user: User) {
        this.confirmationService.confirm({
            header: 'Eliminar ' + user.first_lastname + ' ' + user.first_name,
            message: '¿Estás seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-primary',
            icon: 'pi pi-trash',
            accept: () => {
                this.spinnerService.show();
                this.authenticationService.delete('auth/users/' + user.id).subscribe(
                    response => {
                        const indiceUser = this.users
                            .findIndex(element => element.id === user.id);
                        this.users.splice(indiceUser, 1);
                        this.spinnerService.hide();
                        this.messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            detail: user.first_lastname + ' ' + user.first_name,
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

    selectUser(user: User): void {
        if (user) {
            this.selectedUser = user;
            this.userform.controls['first_name'].setValue(user.first_name);
            this.userform.controls['first_lastname'].setValue(user.first_lastname);
            this.userform.controls['identification'].setValue(user.identification);
            this.userform.controls['ethnic_origin_id'].setValue(user.ethnic_origin.id);
            this.userform.controls['email'].setValue(user.email);
            this.userform.controls['location_id'].setValue(user.location.id);
            this.userform.controls['identification_type_id'].setValue(user.identification_type.id);
            this.userform.controls['sex_id'].setValue(user.sex.id);
            this.userform.controls['gender_id'].setValue(user.gender.id);
            this.userform.controls['birthdate'].setValue(user.birthdate);
            this.headerDialogUser = 'Modificar Usuario';
        } else {
            this.selectedUser = new User();
            this.userform.reset();
            this.headerDialogUser = 'Nuevo Usuario';
        }
        this.displayUser = true;
    }
}
