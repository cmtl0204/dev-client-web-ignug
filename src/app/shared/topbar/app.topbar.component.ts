import {Component} from '@angular/core';
import {AppMainComponent} from '../../layouts/full/app.main.component';
import {User} from '../../models/authentication/user';
import {Role} from '../../models/authentication/role';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    providers: [MessageService],
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {

    activeItem: number;
    user: User;
    role: Role;
    display: boolean;
    flagPasswords: boolean;
    langs: string[];
    selectedLang: string;

    constructor(private message: MessageService, public app: AppMainComponent, private authenticationService: AuthenticationService,
                private router: Router, private spinner: NgxSpinnerService, private translate: TranslateService) {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.langs = this.translate.getLangs();
        this.selectedLang = this.translate.getDefaultLang();
        this.flagPasswords = true;
    }

    mobileMegaMenuItemClick(index) {
        this.app.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }

    logout() {
        this.spinner.show();
        this.authenticationService.logout().subscribe(
            response => {
                this.spinner.hide();
                this.router.navigate(['authentication/login']);
            }, error => {
                this.spinner.hide();
                this.router.navigate(['/authentication/login']);
            }
        );
    }

    validatePassword() {
        console.log(this.user.password);
        console.log(this.user.repeatPassword);
        if ((this.user.password === this.user.repeatPassword) && this.user.password) {
            this.flagPasswords = false;
        } else {
            this.flagPasswords = true;
        }
    }

    changePassword() {
        if (!this.flagPasswords && this.user.password.length >= 6) {
            this.spinner.show();
            this.authenticationService.changePassword('auth/password', {'user': this.user}).subscribe(
                response => {
                    this.message.add({
                        key: 'tst',
                        severity: 'success',
                        summary: 'Cambio de Contraseña',
                        detail: 'Se cambió la contraseña correctamente'
                    });
                    this.spinner.hide();
                }, error => {
                    this.spinner.hide();
                    this.message.add({key: 'tst', severity: 'success', summary: 'Oops tuvimos problemas!', detail: 'Inténtalo de nuevo'});
                    this.router.navigate(['/authentication/login']);
                }
            );
        }
    }

    changeLang(lang: string) {
        this.spinner.show();
        this.selectedLang = lang;
        this.translate.use(lang).subscribe(response => {
            this.spinner.hide();
        });
    }
}
