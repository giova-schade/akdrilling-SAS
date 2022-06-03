import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[DashboardComponent],
    exports:[
        DashboardComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Dashboard {}