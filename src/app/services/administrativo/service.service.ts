import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ServiceService {
    headers: HttpHeaders;

    constructor(private _http: HttpClient) {

    }


    get(url: string) {
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''))
            .append('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json');
        return this._http.get(environment.API_URL + url, {headers: this.headers});
    }

    post(url: string, data: any) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''))
            .append('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json');
        return this._http.post(url, data, {headers: this.headers});
    }

    update(url: string, data: any) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''))
            .append('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json');
        console.log(this.headers);
        return this._http.put(url, data, {headers: this.headers});
    }

    delete(url: string) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''))
            .append('X-Requested-With', 'XMLHttpRequest').append('Content-Type', 'application/json');
        return this._http.delete(url, {headers: this.headers});
    }

    upload(url: string, data: any) {
        url = environment.API_URL + url;
        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken').replace('"', ''));
        return this._http.post(url, data, {headers: this.headers});
    }

    postPublic(url: string, data: any) {
        url = environment.API_URL_PUBLIC + url;
        this.headers = new HttpHeaders().set('Content-Type', 'application/json').append('X-Requested-With', 'XMLHttpRequest');
        return this._http.post(url, data);
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
