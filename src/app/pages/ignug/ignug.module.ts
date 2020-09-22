import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {IgnugRoutes} from './ignug.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CatalogueComponent} from './catalogue/catalogue.component';
import {TranslateModule} from '@ngx-translate/core';

// PrimeNg
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TooltipModule} from 'primeng';


@NgModule({
    declarations: [CatalogueComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(IgnugRoutes),
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        CardModule,
        MessageModule,
        TranslateModule,
        DropdownModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        TableModule,
        TooltipModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class IgnugModule {
}
