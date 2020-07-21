import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {SpinnerModule} from 'primeng/spinner';
import {SliderModule} from 'primeng/slider';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {RatingModule} from 'primeng/rating';
import {ColorPickerModule} from 'primeng/colorpicker';
import {EditorModule} from 'primeng/editor';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PasswordModule} from 'primeng/password';

import {AppNotfoundComponent} from './404/app.notfound.component';
import {AppAccessdeniedComponent} from './401/app.accessdenied.component';
import {AppErrorComponent} from './500/app.error.component';
import {AppLoginComponent} from './login/app.login.component';

import {FormsModule} from '@angular/forms';
import {AuthenticationRoutes} from './authentication.routing';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
        FormsModule,
        AutoCompleteModule,
        MultiSelectModule,
        CalendarModule,
        ChipsModule,
        CheckboxModule,
        RadioButtonModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        SpinnerModule,
        SliderModule,
        LightboxModule,
        ListboxModule,
        RatingModule,
        ColorPickerModule,
        EditorModule,
        ToggleButtonModule,
        SelectButtonModule,
        SplitButtonModule,
        PasswordModule,
        TooltipModule,
        ToastModule,
        MessagesModule,

    ],
    declarations: [
        AppNotfoundComponent,
        AppAccessdeniedComponent,
        AppErrorComponent,
        AppLoginComponent,
    ]
})
export class AuthenticationModule {
}
