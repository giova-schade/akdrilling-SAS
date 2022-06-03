import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { PaymentsComponent } from './payments.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[PaymentsComponent],
    exports:[
        PaymentsComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Payments {}