import { CommonModule , } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core' ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewBudgetComponent } from './Viewbudget.component';

import { NgxFlowchartModule } from 'ngx-flowchart';
//ngprime
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BlockUIModule} from 'primeng/blockui';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CardModule} from 'primeng/card';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import {StepsModule} from 'primeng/steps';
import {MenubarModule} from 'primeng/menubar';


@NgModule({

    imports:[
        MenubarModule,
        StepsModule,
        NgxGraphModule,
        NgxFlowchartModule,
        CardModule,
        ConfirmDialogModule,
        ReactiveFormsModule, 
        CommonModule,
        TableModule,
        DialogModule,
        ButtonModule,
        DropdownModule,
        SliderModule,
        MultiSelectModule,
        ContextMenuModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        SidebarModule,
        ListboxModule,
        CheckboxModule,
        TabViewModule,
        RippleModule,
        ProgressSpinnerModule,
        BlockUIModule,
        PanelMenuModule
    ],
    declarations:[ViewBudgetComponent],
    exports:[
        ViewBudgetComponent,
        CommonModule,
        FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BudgetV {}