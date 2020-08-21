import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
    selector: 'app-hoja-vida',
    templateUrl: './app.hoja-vida.component.html',
    styleUrls: ['app.hoja-vida.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService]
})
export class AppHojaVidaComponent implements OnInit {
    ngOnInit(): void {
    }

}
