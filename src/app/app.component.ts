import {Component} from '@angular/core';
import {SettingsService} from './services/ignug/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(public ajustes: SettingsService) {
    }
}
