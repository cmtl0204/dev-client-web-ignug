import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    ajustes: Ajustes = {
        urlLogoMenu: 'assets/layout/images/logo-menu.png',
        urlLogoFooter: 'assets/layout/images/logo-footer.png',
        urlLogoTopBar: 'assets/layout/images/logo-topbar.png',
    };

    constructor() {
        this.cargarAjustes();
    }

    guardarAjustes(ajustes: Ajustes) {
        localStorage.setItem('ajustes', JSON.stringify(ajustes));
        this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }

    cargarAjustes() {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
    }
}

interface Ajustes {
    urlLogoMenu?: string;
    urlLogoFooter?: string;
    urlLogoTopBar?: string;
}
