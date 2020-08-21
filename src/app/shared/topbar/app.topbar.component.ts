import {Component} from '@angular/core';
import {AppMainComponent} from '../../layouts/full/app.main.component';
import {User} from '../../models/authentication/user';
import {Role} from '../../models/authentication/role';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AuthenticationServiceService} from '../../services/authentication/authentication-service.service';

@Component({
    providers: [MessageService],
    selector: 'app-topbar',
    template: `
        <p-toast key="tst"></p-toast>
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo-wrapper">
                        <a href="#" class="layout-topbar-logo">
                            <img id="logo-topbar" src="assets/layout/images/logo-topbar.png" alt="mirage-layout"/>
                            <span class="app-name">Yavirac</span>
                        </a>
                    </div>

                    <a href="#" class="sidebar-menu-button" (click)="app.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>

                    <a href="#" class="megamenu-mobile-button" (click)="app.onMegaMenuMobileButtonClick($event)">
                        <i class="pi pi-align-right megamenu-icon"></i>
                    </a>

                    <a href="#" class="topbar-menu-mobile-button" (click)="app.onTopbarMobileMenuButtonClick($event)">
                        <i class="pi pi-ellipsis-v"></i>
                    </a>

                    <div class="layout-megamenu-wrapper">
                        <!--                        <a class="layout-megamenu-button" href="#" (click)="app.onMegaMenuButtonClick($event)">-->
                        <!--                            <i class="pi pi-comment"></i>-->
                        <!--                            Mega Menu-->
                        <!--                        </a>-->
                        <!--                        <ul class="layout-megamenu" [ngClass]="{'layout-megamenu-active fadeInDown': app.megaMenuActive}"-->
                        <!--                            (click)="app.onMegaMenuClick($event)">-->
                        <!--                            <li [ngClass]="{'active-topmenuitem': activeItem === 1}" (click)="mobileMegaMenuItemClick(1)">-->
                        <!--                                <a href="#">JavaServer Faces <i class="pi pi-angle-down"></i></a>-->
                        <!--                                <ul>-->
                        <!--                                    <li class="active-row ">-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>PrimeFaces</h3>-->
                        <!--                                        <span>UI Components for JSF</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                    <li>-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>Premium Templates</h3>-->
                        <!--                                        <span>UI Components for JSF</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                    <li>-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>Extensions</h3>-->
                        <!--                                        <span>UI Components for JSF</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                </ul>-->
                        <!--                            </li>-->
                        <!--                            <li [ngClass]="{'active-topmenuitem': activeItem === 2}" (click)="mobileMegaMenuItemClick(2)">-->
                        <!--                                <a href="#">Angular <i class="pi pi-angle-down"></i></a>-->
                        <!--                                <ul>-->
                        <!--                                    <li>-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>PrimeNG</h3>-->
                        <!--                                        <span>UI Components for Angular</span>-->
                        <!--                                    </span>-->

                        <!--                                    </li>-->
                        <!--                                    <li>-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>Premium Templates</h3>-->
                        <!--                                        <span>UI Components for Angular</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                </ul>-->
                        <!--                            </li>-->
                        <!--                            <li [ngClass]="{'active-topmenuitem': activeItem === 3}" (click)="mobileMegaMenuItemClick(3)">-->
                        <!--                                <a href="#">React <i class="pi pi-angle-down"></i></a>-->
                        <!--                                <ul>-->
                        <!--                                    <li>-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>PrimeReact</h3>-->
                        <!--                                        <span>UI Components for React</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                    <li class="active-row">-->
                        <!--                                        <i class="pi pi-circle-on"></i>-->
                        <!--                                        <span>-->
                        <!--                                        <h3>Premium Templates</h3>-->
                        <!--                                        <span>UI Components for React</span>-->
                        <!--                                    </span>-->
                        <!--                                    </li>-->
                        <!--                                </ul>-->
                        <!--                            </li>-->
                        <!--                        </ul>-->
                    </div>
                </div>
                <div class="layout-topbar-right fadeInDown">
                    <ul class="layout-topbar-actions">
                        <!--                        <li #search class="search-item topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === search}">-->
                        <!--                            <a href="#" class="topbar-search-mobile-button" (click)="app.onTopbarItemClick($event,search)">-->
                        <!--                                <i class="topbar-icon pi pi-search"></i>-->
                        <!--                            </a>-->
                        <!--                            <ul class="search-item-submenu fadeInDown" (click)="app.topbarItemClick = true">-->
                        <!--                                <li>-->
                        <!--                                    <span class="md-inputfield search-input-wrapper">-->
                        <!--                                        <input pInputText placeholder="Search..."/>-->
                        <!--                                        <i class="pi pi-search"></i>-->
                        <!--                                    </span>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </li>-->
                        <!--                        <li #calendar class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === calendar}">-->
                        <!--                            <a href="#" (click)="app.onTopbarItemClick($event,calendar)">-->
                        <!--                                <i class="topbar-icon pi pi-calendar"></i>-->
                        <!--                            </a>-->
                        <!--                            <ul class="fadeInDown" (click)="app.topbarItemClick = true">-->
                        <!--                                <li class="layout-submenu-header">-->
                        <!--                                    <h1>Calendar</h1>-->
                        <!--                                </li>-->
                        <!--                                <li class="calendar">-->
                        <!--                                    <p-calendar [inline]="true"></p-calendar>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </li>-->

                        <!--                        <li #message class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === message}">-->
                        <!--                            <a href="#" (click)="app.onTopbarItemClick($event,message)">-->
                        <!--                                <i class="topbar-icon pi pi-inbox"></i>-->
                        <!--                            </a>-->
                        <!--                            <ul class="fadeInDown">-->
                        <!--                                <li class="layout-submenu-header">-->
                        <!--                                    <h1>Messages</h1>-->
                        <!--                                    <span>Today, you have new 4 messages</span>-->
                        <!--                                </li>-->
                        <!--                                <li class="layout-submenu-item">-->
                        <!--                                    <img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35"/>-->
                        <!--                                    <div class="menu-text">-->
                        <!--                                        <p>Override the digital divide</p>-->
                        <!--                                        <span>Cayla Brister</span>-->
                        <!--                                    </div>-->
                        <!--                                    <i class="pi pi-angle-right"></i>-->
                        <!--                                </li>-->
                        <!--                                <li class="layout-submenu-item">-->
                        <!--                                    <img src="assets/layout/images/topbar/avatar-gabie.png" alt="mirage-layout" width="35"/>-->
                        <!--                                    <div class="menu-text">-->
                        <!--                                        <p>Nanotechnology immersion</p>-->
                        <!--                                        <span>Gabie Sheber</span>-->
                        <!--                                    </div>-->
                        <!--                                    <i class="pi pi-angle-right"></i>-->
                        <!--                                </li>-->
                        <!--                                <li class="layout-submenu-item">-->
                        <!--                                    <img src="assets/layout/images/topbar/avatar-gaspar.png" alt="mirage-layout" width="35"/>-->
                        <!--                                    <div class="menu-text">-->
                        <!--                                        <p>User generated content</p>-->
                        <!--                                        <span>Gaspar Antunes</span>-->
                        <!--                                    </div>-->
                        <!--                                    <i class="pi pi-angle-right"></i>-->
                        <!--                                </li>-->
                        <!--                                <li class="layout-submenu-item">-->
                        <!--                                    <img src="assets/layout/images/topbar/avatar-tatiana.png" alt="mirage-layout" width="35"/>-->
                        <!--                                    <div class="menu-text">-->
                        <!--                                        <p>The holistic world view</p>-->
                        <!--                                        <span>Tatiana Gagelman</span>-->
                        <!--                                    </div>-->
                        <!--                                    <i class="pi pi-angle-right"></i>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </li>-->

                        <!--                        <li #gift class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === gift}">-->
                        <!--                            <a href="#" (click)="app.onTopbarItemClick($event,gift)">-->
                        <!--                                <i class="topbar-icon pi pi-envelope"></i>-->
                        <!--                            </a>-->
                        <!--                            <ul class="fadeInDown">-->
                        <!--                                <li class="layout-submenu-header">-->
                        <!--                                    <h1>Deals</h1>-->
                        <!--                                </li>-->

                        <!--                                <li class="deals">-->
                        <!--                                    <ul>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-sapphire.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Sapphire</p>-->
                        <!--                                                <span>Angular</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-roma.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Roma</p>-->
                        <!--                                                <span>Minimalism</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-babylon.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Babylon</p>-->
                        <!--                                                <span>Powerful</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                    </ul>-->
                        <!--                                    <ul>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-harmony.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Harmony</p>-->
                        <!--                                                <span>USWDS</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-prestige.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Prestige</p>-->
                        <!--                                                <span>Elegancy</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                        <li>-->
                        <!--                                            <img src="assets/layout/images/topbar/deal-icon-ultima.png" alt="mirage-layout" width="35"/>-->
                        <!--                                            <div class="menu-text">-->
                        <!--                                                <p>Ultima</p>-->
                        <!--                                                <span>Material</span>-->
                        <!--                                            </div>-->
                        <!--                                            <i class="pi pi-angle-right"></i>-->
                        <!--                                        </li>-->
                        <!--                                    </ul>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </li>-->

                        <li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === profile}">
                            <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <!--Imagen perfil principal-->
                                <img src="{{'assets/layout/images/topbar/avatars/'+user.identification+'.jpg'}}" class="ui-button-rounded"
                                     alt="mirage-layout"/>
                            </span>
                                <span class="profile-info-wrapper">
                                <h3>{{user.first_name}} {{user.first_lastname}}</h3>
                                <span>{{role.name}}</span>
                            </span>
                            </a>
                            <ul class="profile-item-submenu fadeInDown">
                                <li class="profile-submenu-header">
                                    <div class="performance">
                                        <span>Weekly Performance</span>
                                        <img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout"/>
                                    </div>
                                    <div class="profile">
                                        <!--Imagen pequeña-->
                                        <img src="{{'assets/layout/images/topbar/avatars/'+user.identification+'.jpg'}}"
                                             class="ui-button-rounded" alt="mirage-layout"
                                             width="40"/>
                                        <h1>{{user.first_name}} {{user.first_lastname}}</h1>
                                        <span>{{role.name}}</span>
                                    </div>
                                </li>
                                <!--                                <li class="layout-submenu-item">-->
                                <!--                                    <i class="pi pi-list icon icon-1"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Tasks</p>-->
                                <!--                                        <span>3 open issues</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <!--                                <li class="layout-submenu-item">-->
                                <!--                                    <i class="pi pi-shopping-cart icon icon-2"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Payments</p>-->
                                <!--                                        <span>24 new</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <!--                                <li class="layout-submenu-item">-->
                                <!--                                    <i class="pi pi-users icon icon-3"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Clients</p>-->
                                <!--                                        <span>+80%</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <li class="layout-submenu-footer">
                                    <button class="signout-button" (click)="logout()">Sign Out</button>
                                    <button class="buy-mirage-button" (click)="display=true">Change Password</button>
                                </li>
                            </ul>
                        </li>
                        <!--                        <li>-->
                        <!--                            <a href="#" class="layout-rightpanel-button" (click)="app.onRightPanelButtonClick($event)">-->
                        <!--                                <i class="pi pi-arrow-left"></i>-->
                        <!--                            </a>-->
                        <!--                        </li>-->
                    </ul>

                    <ul class="profile-mobile-wrapper">
                        <li #mobileProfile class="topbar-item profile-item"
                            [ngClass]="{'active-topmenuitem': app.activeTopbarItem === mobileProfile}">
                            <a href="#" (click)="app.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <!--Imagen mobile-->
                                <img src="{{'assets/layout/images/topbar/avatars/'+user.identification+'.jpg'}}" class="ui-button-rounded"
                                     alt="mirage-layout"/>
                            </span>
                                <span class="profile-info-wrapper">
                                <h3>{{user.first_name}} {{user.first_lastname}}</h3>
                                <span>{{role.name}}</span>
                            </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="profile-submenu-header">
                                    <div class="performance">
                                        <span>Weekly Performance</span>
                                        <img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout"/>
                                    </div>
                                    <div class="profile">
                                        <img src="{{'assets/layout/images/topbar/avatars/'+user.identification+'.jpg'}}" alt="mirage-layout"
                                             width="45"/>
                                        <h1>{{user.first_name}} {{user.first_lastname}}</h1>
                                        <span>{{role.name}}</span>
                                    </div>
                                </li>
                                <!--                                <li>-->
                                <!--                                    <i class="pi pi-list icon icon-1"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Tasks</p>-->
                                <!--                                        <span>3 open issues</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <!--                                <li>-->
                                <!--                                    <i class="pi pi-shopping-cart icon icon-2"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Payments</p>-->
                                <!--                                        <span>24 new</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <!--                                <li>-->
                                <!--                                    <i class="pi pi-users icon icon-3"></i>-->
                                <!--                                    <div class="menu-text">-->
                                <!--                                        <p>Clients</p>-->
                                <!--                                        <span>+80%</span>-->
                                <!--                                    </div>-->
                                <!--                                    <i class="pi pi-angle-right"></i>-->
                                <!--                                </li>-->
                                <li class="layout-submenu-footer">
                                    <button class="signout-button" (click)="logout()">Sign Out</button>
                                    <button class="buy-mirage-button" (click)="display=true">Change Password</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <p-dialog header="Cambio de Contraseña" [(visible)]="display" modal="true" showEffect="fade" [style]="{width: '450px'}">
            <label for="password">Ingresa tu nueva contraseña</label>
            <div class="ui-inputgroup">
                <span class="ui-inputgroup-addon"><i class="pi pi-key"></i></span>
                <input id="password" type="password" size="30" pInputText minlength="6"
                       [(ngModel)]="user.password" (keyup)="validatePassword()">
            </div>
            <br>
            <p-message *ngIf="user.password && user.password.length<6" severity="error"
                       text="Tienes que ingresar mínimo 6 caracteres"></p-message>

            <br>
            <label for="repeatPassword">Repite la contraseña</label>
            <div class="ui-inputgroup">
                <span class="ui-inputgroup-addon"><i class="pi pi-key"></i></span>
                <input id="repeatPassword" class="ng-dirty ng-invalid" type="password" size="30" pInputText minlength="6"
                       [(ngModel)]="user.repeatPassword" (keyup)="validatePassword()">
            </div>
            <br>
            <p-message *ngIf="user.password && flagPasswords" severity="error" text="Las contraseñas no coinciden"></p-message>
            <p-footer>
                <button type="button" pButton icon="pi pi-refresh" class="ui-button-success"
                        [disabled]="flagPasswords || (user.password && user.password.length<6)"
                        (click)="display=false;changePassword()" label="Cambiar"></button>
            </p-footer>
        </p-dialog>
    `
})
export class AppTopBarComponent {

    activeItem: number;
    user: User;
    role: Role;
    display: boolean;
    flagPasswords: boolean;

    constructor(private message: MessageService, public app: AppMainComponent, private authenticationService: AuthenticationServiceService,
                private router: Router, private spinner: NgxSpinnerService) {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
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
}
