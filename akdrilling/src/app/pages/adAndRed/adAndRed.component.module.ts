import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { AdAndRedComponent } from './adAndRed.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[AdAndRedComponent],
    exports:[
        AdAndRedComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdAndRed {}