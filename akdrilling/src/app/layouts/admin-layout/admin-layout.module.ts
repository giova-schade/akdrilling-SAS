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
import {   Report } from "../../pages/report/report.component.module";
import {   ReportBudget } from "../../pages/reportBudget/reportBudget.component.module";
import {   ReportFP } from "../../pages/reportFP/reportFP.component.module";
import {   ReportCCD } from "../../pages/reportCCD/reportCCD.component.module";

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
import { Revenue } from "src/app/pages/revenue/revenue.component.module";
import { RevenueV } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component.module";
import { ReportFE } from "src/app/pages/reportFE/reportFE.component.module";
import { ReportCm1 } from "src/app/pages/reportCm1/reportCm1.component.module";
import { ReportCm2 } from "src/app/pages/reportCm2/reportCm2.component.module";
import { ReportCm3 } from "src/app/pages/reportCm3/reportCm3.component.module";
import { ReportCm4 } from "src/app/pages/reportCm4/reportCm4.component.module";
import { ReportCm5 } from "src/app/pages/reportCm5/reportCm5.component.module";
import { ReportCm6 } from "src/app/pages/reportCm6/reportCm6.component.module";
import { ReportCm7 } from "src/app/pages/reportCm7/reportCm7.component.module";
import { ReportCm8 } from "src/app/pages/reportCm8/reportCm8.component.module";
import { ReportCm9 } from "src/app/pages/reportCm9/reportCm9.component.module";
import { ReportCm10 } from "src/app/pages/reportCm10/reportCm10.component.module";
import { Distribution } from "src/app/pages/distribution/distribution.component.module";
import { DistributionV } from "src/app/pages/distribution/ViewDistribution/Viewdistribution.component.module";



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
    home,
    Report,
    Revenue,
    RevenueV,
    ReportBudget,
    ReportFP,
    ReportFE,
    ReportCCD,
    ReportCm1,
    ReportCm2,
    ReportCm3,
    ReportCm4,
    ReportCm5,
    ReportCm6,
    ReportCm7,
    ReportCm8,
    ReportCm9,
    ReportCm10,
    Distribution,
    DistributionV

  ],
  declarations: [
    
  ]
})
export class AdminLayoutModule {}
