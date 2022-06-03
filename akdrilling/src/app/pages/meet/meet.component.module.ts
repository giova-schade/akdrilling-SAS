import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule } from '@angular/forms';

import { MeetComponent } from './meet.component';

@NgModule({

    imports:[
        CommonModule
    ],
    declarations:[MeetComponent],
    exports:[
        MeetComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Meet {}