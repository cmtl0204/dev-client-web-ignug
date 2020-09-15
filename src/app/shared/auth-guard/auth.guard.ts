import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../models/authentication/user';
import {Role} from '../../models/authentication/role';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    user: User;
    role: Role;

    constructor(private routes: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
        console.log(this.role);
        if (localStorage.getItem('isLoggedin') === 'true') {
            switch (next['_routerState']['url']) {
                case '/':
                    this.routes.navigate(['/attendance/asistencia-laboral']);
                    break;
                case '/attendance/asistencia-laboral':
                    if (this.role.code === '1' || this.role.code === '2' || this.role.code === '3' || this.role.code === '4'
                        || this.role.code === '5' || this.role.code === '6' || this.role.code === '7') {
                        return true;
                    } else {
                        this.routes.navigate(['/authentication/login']);
                    }
                    break;
                case '/attendance/administracion-asistencia-laboral':
                    if (this.role.code === '2' || this.role.code === '3' || this.role.code === '4' || this.role.code === '5'
                        || this.role.code === '6') {
                        return true;
                    } else {
                        this.routes.navigate(['/authentication/401']);
                    }
                    break;
                default: {
                    this.routes.navigate(['/authentication/404']);
                    break;
                }
            }
        } else {
            this.routes.navigate(['/authentication/login']);
        }
    }
}
