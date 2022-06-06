import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
//componentes
import { Notifications } from "../../pages/notifications/notifications.component.module";
import { Dashboard } from "../../pages/dashboard/dashboard.component.module";
import {  UploadFiles } from "../../pages/UploadFiles/uploadFiles.component.module";
import {  OpenPeriod } from "../../pages/openPeriod/openPeriod.component.module";
import {  AdAndRed } from "../../pages/adAndRed/adAndRed.component.module";
import {  Budget } from "../../pages/Budget/budget.component.module";
import {  ClosePeriod } from "../../pages/closePeriod/closePeriod.component.module";
import {  FloatInAction } from "../../pages/floatInAction/floatInAction.component.module";
import {  FloatPlanned } from "../../pages/floatPlanned/floatPlanned.component.module";
import {  Meet } from "../../pages/meet/meet.component.module";
import {  ReopenPeriod } from "../../pages/reopenPeriod/reopenPeriod.component.module";
import {  Payments } from "../../pages/pagos/payments.component.module";
import {  home } from "../../pages/home/home.component.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// primeng
import { ButtonModule } from 'primeng/button';
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



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ButtonModule,
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
    Notifications,
    Dashboard,
    UploadFiles,
    OpenPeriod,
    AdAndRed,
    Budget,
    ClosePeriod,
    FloatInAction,
    FloatPlanned,
    Meet,
    ReopenPeriod,
    Payments,
    home
    

  ],
  declarations: [
    
  ]
})
export class AdminLayoutModule {}
