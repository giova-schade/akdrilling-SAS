import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { FloatInActionComponent } from './floatInAction.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[FloatInActionComponent],
    exports:[
        FloatInActionComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FloatInAction {}