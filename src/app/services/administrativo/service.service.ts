import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/authentication/user';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ServiceService {
    headers: HttpHeaders;

    constructor(private _http: HttpClient, private router: Router) {

    }


    get(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL + url;
        return this._http.get(url, {headers: this.headers});
    }

    post(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL + url;
        return this._http.post(url, data, {headers: this.headers});
    }

    update(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL + url;
        return this._http.put(url, data, {headers: this.headers});
    }

    delete(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL + url;
        return this._http.delete(url, {headers: this.headers});
    }

    upload(url: string, data: any) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        return this._http.post(url, data, {headers: this.headers});
    }

    login(user: User) {
        const url = environment.API_URL_PUBLIC + 'auth/login';
        return this._http.post(url, user).subscribe(response => {
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
                            route = '/administrativo/asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '2':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '3':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '4':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '5':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '6':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        case '7':
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                        default:
                            route = '/administrativo/administracion-asistencia-laboral';
                            selectedRole = role;
                            break;
                    }
                    localStorage.setItem('role', JSON.stringify(selectedRole));
                    this.router.navigate([route]);
                });

            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                localStorage.removeItem('roles');
                localStorage.removeItem('role');
                localStorage.removeItem('isLoggedin');
                return response['user'];
            }
        }, error => {
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('roles');
            localStorage.removeItem('role');
            localStorage.removeItem('isLoggedin');
            return error;
        });
    }

    logout() {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        const url = environment.API_URL_PUBLIC + 'auth/logout?user_id=' + localStorage.getItem('user')['id'];
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedin');
        return this._http.post(url, null, {headers: this.headers});
    }

    validarCorreoElectronico(correoElectronico: string) {
        const expreg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (expreg.test(correoElectronico.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }

    validarSoloNumeros(cadena: string) {
        const expreg = /^[0-9]*$/;
        return expreg.test(cadena);
    }

    validarSoloLetrasConEspacio(cadena: string) {
        const expreg = /^[A-Z_ ]+([A-Z]+)*$/;
        return expreg.test(cadena.toUpperCase());
    }
}
