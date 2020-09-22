import {Component} from '@angular/core';
import {SettingsService} from './services/ignug/settings.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(public ajustes: SettingsService,
                private translate: TranslateService) {
        this.translate.addLangs(['es', 'en']);
        this.translate.setDefaultLang('es');
    }
}
