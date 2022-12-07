import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AkdabopRoutes } from "./akdabop-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import {  OpenPeriodComponent } from "../../pages/openPeriod/openPeriod.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
// primeng
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
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

//modulos
import {  Budget } from "../../pages/Budget/budget.component.module";
import { Report } from "src/app/pages/report/report.component.module";
import { Revenue } from "src/app/pages/revenue/revenue.component.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AkdabopRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DialogModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    SidebarModule,
    ListboxModule,
    ReactiveFormsModule,
    CheckboxModule,
    TabViewModule,
    RippleModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PanelMenuModule,
    Budget,
    Report,
    Revenue

  ],
  declarations: [
  ]
})
export class AkdabopLayoutModule {}
