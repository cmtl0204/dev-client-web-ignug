import {Component} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent {
    flagPassword: string;
    userName: string;
    password: string;
    dark: boolean;
    checked: boolean;
    politicasPassword: Array<string>;
    toolTipPoliticasPassword: string;

    constructor() {
        this.flagPassword = 'password';
        this.politicasPassword = new Array<string>();
        this.politicasPassword.push('Mínimo 6 caracteres');
        this.toolTipPoliticasPassword = '';
        this.politicasPassword.forEach(value => {
            this.toolTipPoliticasPassword += value + '\n';
        });
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
