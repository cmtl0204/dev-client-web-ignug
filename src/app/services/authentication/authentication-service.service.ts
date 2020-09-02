import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/authentication/user';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationServiceService {
    headers: HttpHeaders;

    constructor(private _http: HttpClient) {
    }

    login(user: User) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/login';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json').append('X-Requested-With', 'XMLHttpRequest');
        return this._http.post(url, user);
    }

    logout() {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout?user_id=' + localStorage.getItem('user')['id'];
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('roles');
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedin');
        return this._http.post(url, null, {headers: this.headers});
    }

    get(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.get(url, {headers: this.headers});
    }

    post(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.post(url, data, {headers: this.headers});
    }

    update(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {headers: this.headers});
    }

    delete(url: string) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');
        // .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.delete(url, {headers: this.headers});
    }

    changePassword(url: string, data: any) {
        this.headers = new HttpHeaders()
            .set('X-Requested-With', 'XMLHttpRequest')
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {headers: this.headers});
    }
}
