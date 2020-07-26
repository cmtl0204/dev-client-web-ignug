import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {ServiceService} from '../../../services/administrativo/service.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';
import {User} from '../../../models/authentication/user';

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

    validateLogin: boolean;
    msgs: Message[] = [];
    user: User;

    constructor(private service: ServiceService, private spinner: NgxSpinnerService, private router: Router) {
        this.flagPassword = 'password';
        this.politicasPassword = new Array<string>();
        this.politicasPassword.push('Mínimo 6 caracteres');
        this.toolTipPoliticasPassword = '';
        this.politicasPassword.forEach(value => {
            this.toolTipPoliticasPassword += value + '\n';
        });
        this.user = new User();
    }

    async onLoggedin(event) {
        if (event.which === 13 || event === 13 || event.which === 1) {
            this.msgs = [];
            if (this.user.user_name == null || this.user.password == null) {
                this.msgs.push({severity: 'error', summary: 'Debes ingresar el usuario y la contraseña', detail: 'Inténtalo de nuevo!'});
                return;
            }
            this.spinner.show();


            const res = await this.service.login(this.user);
            console.log(res);
            this.spinner.hide();

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
}
