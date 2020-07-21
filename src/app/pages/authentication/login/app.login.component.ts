import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {ServiceService} from '../../../services/administrativo/service.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html'
})
export class AppLoginComponent {
    flagPassword: string;
    userName: string;
    password: string;
    dark: boolean;
    checked: boolean;
    politicasPassword: Array<string>;
    toolTipPoliticasPassword: string;

    validateLogin: boolean;
    msgs: Message[] = [];

    constructor(private service: ServiceService, private spinner: NgxSpinnerService, private router: Router) {
        this.flagPassword = 'password';
        this.politicasPassword = new Array<string>();
        this.politicasPassword.push('Mínimo 6 caracteres');
        this.toolTipPoliticasPassword = '';
        this.politicasPassword.forEach(value => {
            this.toolTipPoliticasPassword += value + '\n';
        });
    }

    onLoggedin(event) {
        if (event.which === 13 || event === 13 || event.which === 1) {
            this.msgs = [];
            if (this.userName == null || this.password == null) {
                this.msgs.push({severity: 'error', summary: 'Debes ingresar el usuario y la contraseña', detail: 'Inténtalo de nuevo!'});
                return;
            }

            this.validateLogin = false;
            this.spinner.show();
            const clientId = environment.CLIENT_ID;
            const clientSecret = environment.CLIENT_SECRET;
            const grantType = environment.GRANT_TYPE;
            const userName = this.userName;

            this.service.postPublic('auth/login', {
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': grantType,
                'user_name': userName,
                'email': userName,
                'password': this.password
            }).subscribe(
                response => {
                    if (response['user']['state_id'] === 1) {
                        localStorage.setItem('token', JSON.stringify(response['token']['accessToken']));
                        localStorage.setItem('isLoggedin', 'true');
                        localStorage.setItem('user', JSON.stringify(response['user']));
                        localStorage.setItem('accessToken', JSON.stringify(response['token']['accessToken']));
                        localStorage.setItem('token', JSON.stringify(response['token']['token']));
                        localStorage.setItem('roles', JSON.stringify(response['roles']));
                        response['roles'].forEach(role => {
                            if (role.code === '1') {
                                localStorage.setItem('role', JSON.stringify(role));
                                this.router.navigate(['administrativo/asistencia-laboral']);
                            }
                            if (role.code === '2') {
                                localStorage.setItem('role', JSON.stringify(role));
                                this.router.navigate(['administrativo/asistencia-laboral']);
                            }
                        });

                        if (response['roles'].length === 0) {
                            this.msgs.push({
                                severity: 'warn',
                                summary: 'No tienes un rol asignado',
                                detail: 'Comunícate con el administrador!'
                            });
                        }
                    } else if (response['user']['state_id'] !== 1) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('user');
                        localStorage.removeItem('roles');
                        localStorage.removeItem('isLoggedin');
                        this.validateLogin = true;
                    }
                    this.validateLogin = false;
                    this.spinner.hide();
                },
                error => {
                    if (error.status === 422) {
                        this.msgs.push({severity: 'error', summary: 'Ingresa el usuario y la contraseña', detail: 'Inténtalo de nuevo!'});
                    }
                    if (error.status === 404) {
                        this.msgs.push({severity: 'warn', summary: 'Tú usuario no existe', detail: 'Inténtalo de nuevo!'});
                    }
                    if (error.status === 401) {
                        this.msgs.push({severity: 'error', summary: 'Tu contraseña no es correcta!', detail: 'Inténtalo de nuevo!'});
                    }
                    if (error.status === 500) {
                        this.msgs.push({
                            severity: 'error',
                            summary: 'Tenemos problemas con el servidor!',
                            detail: 'Inténtalo de nuevo más tarde!'
                        });
                    }
                    localStorage.removeItem('token');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('roles');
                    localStorage.removeItem('isLoggedin');
                    this.validateLogin = true;
                    this.spinner.hide();
                });
        }
    }

    validarPolitasPassword() {
        if (this.password.trim().length >= 6) {
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
}
