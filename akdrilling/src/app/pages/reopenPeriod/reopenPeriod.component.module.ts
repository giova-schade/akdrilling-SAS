import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { ReopenPeriodComponent } from './reopenPeriod.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[ReopenPeriodComponent],
    exports:[
        ReopenPeriodComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReopenPeriod {}