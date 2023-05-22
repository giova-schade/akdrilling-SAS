import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AkdaafpRoutes } from "./akdaafp-layout.routing";
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
import {  FloatFPV  } from "../../pages/floatPlanned/ViewFloatP/ViewFloatp.component.module";
import {  FloatFEV  } from "../../pages/floatInAction/ViewFloatAction/ViewFloatAction.component.module";
import {  MeetV  } from "../../pages/meet/ViewMeet/ViewMeet.component.module";
import {  PayV  } from "../../pages/pagos/ViewPagos/ViewPagos.component.module";
import { Report } from "src/app/pages/report/report.component.module";
import { Revenue } from "src/app/pages/revenue/revenue.component.module";
import { RevenueV } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component.module";
import { ReportCCD } from "src/app/pages/reportCCD/reportCCD.component.module";
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
import { ReportBudget } from "src/app/pages/reportBudget/reportBudget.component.module";
import { ReportFP } from "src/app/pages/reportFP/reportFP.component.module";
import { ReportFE } from "src/app/pages/reportFE/reportFE.component.module";
import { Distribution } from "src/app/pages/distribution/distribution.component.module";
import { DistributionV } from "src/app/pages/distribution/ViewDistribution/Viewdistribution.component.module";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AkdaafpRoutes),
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
    FloatFPV,
    FloatFEV,
    MeetV,
    Report,
    PayV,
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
export class akdaafpLayoutModule {}
