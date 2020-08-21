import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthenticationServiceService} from '../../../services/authentication/authentication-service.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';
import {User} from '../../../models/authentication/user';
import {IgnugServiceService} from '../../../services/ignug/ignug-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html'
})
export class AppLoginComponent {
    flagPassword: string;
    dark: boolean;
    checked: boolean;
    politicasPassword: Array<string>;
    toolTipPoliticasPassword: string;
    msgs: Message[] = [];
    user: User;

    constructor(private authenticationService: AuthenticationServiceService, private ignugService: IgnugServiceService,
                private spinner: NgxSpinnerService, private router: Router) {
        this.flagPassword = 'password';
        this.politicasPassword = new Array<string>();
        this.politicasPassword.push('Mínimo 6 caracteres');
        this.toolTipPoliticasPassword = '';
        this.politicasPassword.forEach(value => {
            this.toolTipPoliticasPassword += value + '\n';
        });
        this.user = new User();
    }

    onLoggedin(event) {
        if (event.which === 13 || event === 13 || event.which === 1) {
            this.msgs = [];
            if (this.user.user_name == null || this.user.password == null) {
                this.msgs.push({severity: 'error', summary: 'Debes ingresar el usuario y la contraseña', detail: 'Inténtalo de nuevo!'});
                return;
            }

            this.spinner.show();
            const clientId = environment.CLIENT_ID;
            const clientSecret = environment.CLIENT_SECRET;
            const grantType = environment.GRANT_TYPE;

            this.authenticationService.login(this.user).subscribe(
                response => {
                    if (response['user']['state_id'] === 1) {
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('user', JSON.stringify(response['user']));
                        localStorage.setItem('accessToken', JSON.stringify(response['token']['accessToken']));
                        localStorage.setItem('token', JSON.stringify(response['token']['token']));
                        localStorage.setItem('roles', JSON.stringify(response['roles']));
                        response['roles'].forEach(role => {
                            let route = '';
                            let selectedRole = '';
                            switch (role) {
                                case '1':
                                    route = '/attendance/asistencia-laboral';
                                    selectedRole = role;
                                    break;
                                case '2':
                                    route = '/attendance/administracion-sorteo';
                                    selectedRole = role;
                                    break;
                                case '3':
                                    route = '/attendance/administracion-sorteo';
                                    selectedRole = role;
                                    break;
                                case '4':
                                    route = '/attendance/administracion-sorteo';
                                    selectedRole = role;
                                    break;
                                case '5':
                                    route = '/attendance/administracion-sorteo';
                                    selectedRole = role;
                                    break;
                                case '6':
                                    route = '/attendance/administracion-sorteo';
                                    selectedRole = role;
                                    break;
                                case '7':
                                    route = '/attendance/asistencia-laboral';
                                    selectedRole = role;
                                    break;
                                default:
                                    route = '/attendance/asistencia-laboral';
                                    selectedRole = role;
                                    break;
                            }
                            localStorage.setItem('role', JSON.stringify(selectedRole));
                            this.router.navigate([route]);
                        });

                        if (response['roles'].length === 0) {
                            this.msgs.push({
                                severity: 'warn',
                                summary: 'No tienes un rol asignado',
                                detail: 'Comunícate con el administrador!'
                            });
                        }
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('user');
                        localStorage.removeItem('roles');
                        localStorage.removeItem('role');
                        localStorage.removeItem('isLoggedin');
                    }
                    this.spinner.hide();
                },
                error => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('roles');
                    localStorage.removeItem('role');
                    localStorage.removeItem('isLoggedin');
                    this.spinner.hide();
                    if (error.status === 422) {
                        this.msgs.push({severity: 'error', summary: 'Ingresa el usuario y la contraseña', detail: 'Inténtalo de nuevo!'});
                        return;
                    }
                    if (error.status === 404) {
                        this.msgs.push({severity: 'warn', summary: 'Tú usuario no existe', detail: 'Inténtalo de nuevo!'});
                        return;
                    }
                    if (error.status === 401) {
                        this.msgs.push({severity: 'error', summary: 'Tu contraseña no es correcta!', detail: 'Inténtalo de nuevo!'});
                        return;
                    }
                    if (error.status === 500) {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Tenemos problemas con el servidor!',
                            detail: 'Inténtalo de nuevo más tarde!'
                        });
                        return;
                    }

                    this.msgs.push({
                        severity: 'error',
                        summary: 'Tenemos problemas con el servidor!',
                        detail: 'Inténtalo de nuevo más tarde!'
                    });
                    return;
                });
        }
    }

    validarPolitasPassword() {
        if (this.user.password.trim().length >= 6) {
            this.politicasPassword[0] = '';
        } else {
            this.politicasPassword[0] = 'Mínimo 6 caracteres';
        }
        this.toolTipPoliticasPassword = '';
        this.politicasPassword.forEach(value => {
            if (value !== '') {
                this.toolTipPoliticasPassword += value + '\n';
            }
        });
    }

    validarSoloNumeros(event) {
        return this.ignugService.validarSoloNumeros(event);
    }
}
