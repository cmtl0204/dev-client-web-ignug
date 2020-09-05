// Modulos Internos
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HojaVidaRoutes} from './professional.routing';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ConfirmationService, MessageService} from 'primeng/api';
// Modulos Externos
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
import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {PickListModule} from 'primeng/picklist';
import {OrderListModule} from 'primeng/orderlist';
import {CarouselModule} from 'primeng/carousel';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {AccordionModule, DialogService, MessageModule, StepsModule, TabViewModule} from 'primeng';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

// Mis componentes
import {AppPersonalInformationComponent} from './personal-information/app-personal-information.component';
import {ProfessionalComponent} from './professional.component';
import {AppCourseComponent} from './course/app.course.component';
import {AppProfessionalReferenceComponent} from './professional-reference/app-professional-reference.component';
import {AppAbilityComponent} from './ability/app.ability.component';
import {AppProfessionalExperienceComponent} from './profesional-experience/app.professional-experience.component';
import {AppAcademicFormationComponent} from './academic-formation/app.academic-formation.component';
import {AppOportunitiesComponent} from './oportunities/app.oportunities.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HojaVidaRoutes),
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
        TableModule,
        DataViewModule,
        PanelModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        PickListModule,
        OrderListModule,
        CarouselModule,
        FullCalendarModule,
        TabViewModule,
        InputNumberModule,
        ToastModule,
        AccordionModule,
        DialogModule,
        ConfirmDialogModule,
        MessageModule,
        KeyFilterModule,
        ReactiveFormsModule,
        StepsModule
    ],
    declarations: [
        AppPersonalInformationComponent,
        ProfessionalComponent,
        AppCourseComponent,
        AppProfessionalReferenceComponent,
        AppAbilityComponent,
        AppProfessionalExperienceComponent,
        AppAcademicFormationComponent,
        AppOportunitiesComponent

    ],
    providers: [DialogService, MessageService, ConfirmationService]
})
export class ProfessionalModule {
}
