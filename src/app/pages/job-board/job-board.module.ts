// Modulos Internos
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {JobBoardRoutes} from './job-board.routing';

// MyModules
import {ProfessionalModule} from './professional/professional.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JobBoardRoutes),
        FormsModule,
        ProfessionalModule,
    ],
    declarations: [],
    providers: []
})
export class JobBoardModule {
}
