import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    ajustes: Ajustes = {
        urlLogoMenu: 'assets/layout/images/logo-menu.png',
        urlLogoFooter: 'assets/layout/images/logo-footer.png',
        urlLogoTopBar: 'assets/layout/images/logo-topbar.png',
    };

    constructor(@Inject(DOCUMENT) private document) {
        this.cargarAjustes();
    }

    guardarAjustes(ajustes: Ajustes) {
        localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
        this.document.getElementById('logo-menu').setAttribute('src', ajustes.urlLogoMenu);
        this.document.getElementById('logo-footer').setAttribute('src', ajustes.urlLogoFooter);
        this.document.getElementById('logo-topbar').setAttribute('src', ajustes.urlLogoTopBar);
    }

    cargarAjustes() {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
    }
}

interface Ajustes {
    urlLogoMenu: string;
    urlLogoFooter: string;
    urlLogoTopBar: string;
}
