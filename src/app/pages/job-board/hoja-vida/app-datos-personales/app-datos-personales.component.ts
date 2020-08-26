import {Component, OnInit} from '@angular/core';
import {Catalogue} from '../../../../models/ignug/models.index';
import {IgnugServiceService} from '../../../../services/ignug/ignug-service.service';
import {User} from '../../../../models/authentication/models.index';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {AuthenticationServiceService} from '../../../../services/authentication/authentication-service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-app-datos-personales',
    templateUrl: './app-datos-personales.component.html',
})
export class AppDatosPersonalesComponent implements OnInit {
    displayUser: boolean;
    ethnicsOrigin: SelectItem[];
    cantones: SelectItem[];
    identificationTypes: SelectItem[];
    sexs: SelectItem[];
    genders: SelectItem[];
    selectedUser: User;
    users: Array<User>;
    colsUser: any[];
    headerDialogUser: string;

    constructor(private message: MessageService, private ignugService: IgnugServiceService, private spinner: NgxSpinnerService,
                private authenticationService: AuthenticationServiceService, private confirmationService: ConfirmationService) {
        this.selectedUser = new User();
        this.users = new Array<User>();
        this.colsUser = [
            {field: 'identification', header: 'Cédula/Pasaporte'},
            {field: 'first_name', header: 'Nombre'},
            {field: 'first_lastname', header: 'Apellido'},
            {field: 'email', header: 'Correo Institucional'},
        ];
    }

    ngOnInit(): void {
        this.getUsers();
        this.getEthnicsOrigin();
        this.getLocations();
        this.getIdentificationTypes();
        this.getSexs();
        this.getGenders();
    }

    getEthnicsOrigin(): void {
        const parameters = '?type=ethnic_origin';
        this.ignugService.get('catalogues' + parameters).subscribe(
            response => {
                const ethnicsOrigin = response['data']['catalogues'];
                this.ethnicsOrigin = [{label: 'Seleccione Etnia', value: 0}];
                ethnicsOrigin.forEach(item => {
                    this.ethnicsOrigin.push({label: item.name, value: item.id});
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

            });
    }

    getUser() {
        this.authenticationService.get('auth/users/' + 1).subscribe(
            response => {
                this.selectedUser = response['data']['user'];
            });
    }

    getUsers() {
        this.spinner.show();
        this.authenticationService.get('auth/users').subscribe(
            response => {
                this.spinner.hide();
                this.users = response['data']['users'];
            }, error => {
                this.spinner.hide();
            });
    }

    createUser() {
        this.selectedUser.user_name = this.selectedUser.identification;
        this.spinner.show();
        this.authenticationService.post('auth/users', {'user': this.selectedUser}).subscribe(
            response => {
                this.spinner.hide();
                this.message.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se creó correctamente',
                    detail: this.selectedUser.first_lastname + ' ' + this.selectedUser.first_name,
                    life: 3000
                });
                this.displayUser = false;
            }, error => {
                this.spinner.hide();
            });
    }

    updateUser() {
        this.spinner.show();
        this.authenticationService.update('auth/users', {'user': this.selectedUser}).subscribe(
            response => {
                this.spinner.hide();
                this.message.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Se actualizó correctamente',
                    detail: this.selectedUser.first_lastname + ' ' + this.selectedUser.first_name,
                    life: 3000
                });
                this.displayUser = false;
            }, error => {
                this.spinner.hide();
            });
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            header: 'Eliminar ' + user.first_lastname + ' ' + user.first_name,
            message: '¿Estás seguro de eliminar?',
            acceptButtonStyleClass: 'ui-button-danger',
            icon: 'pi pi-trash',
            accept: () => {
                this.spinner.show();
                this.authenticationService.delete('auth/users/' + user.id).subscribe(
                    response => {
                        const indiceUser = this.users
                            .findIndex(element => element.id === user.id);
                        this.users.splice(indiceUser, 1);
                        this.spinner.hide();
                        this.message.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Se eliminó correctamente',
                            detail: user.first_lastname + ' ' + user.first_name,
                            life: 3000
                        });
                        this.displayUser = false;
                    }, error => {
                        this.spinner.hide();
                    });
            }
        });

    }

    selectUser(user: User): void {
        if (user) {
            this.selectedUser = user;
            this.headerDialogUser = 'Modificar Usuario';
        } else {
            this.selectedUser = new User();
            this.headerDialogUser = 'Nuevo Usuario';
        }
        this.displayUser = true;

    }
}
