import { Routes } from "@angular/router";
import { AdAndRedComponent } from "src/app/pages/adAndRed/adAndRed.component";
import { ViewAdAndRedComponent } from "src/app/pages/adAndRed/ViewAdAndRed/ViewAdAndRed.component";
import { ViewBudgetComponent } from "src/app/pages/Budget/ViewBudget/Viewbudget.component";
import { ClosePeriodComponent } from "src/app/pages/closePeriod/closePeriod.component";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { FloatInActionComponent } from "src/app/pages/floatInAction/floatInAction.component";
import { FloatPlannedComponent } from "src/app/pages/floatPlanned/floatPlanned.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { MeetComponent } from "src/app/pages/meet/meet.component";
import { OpenPeriodComponent } from "src/app/pages/openPeriod/openPeriod.component";
import { PaymentsComponent } from "src/app/pages/pagos/payments.component";
import { ReopenPeriodComponent } from "src/app/pages/reopenPeriod/reopenPeriod.component";
import { UploadFilesComponent } from "src/app/pages/UploadFiles/uploadFiles.component";

import { BudgetComponent } from "../../pages/Budget/budget.component";
import { ReportComponent } from "src/app/pages/report/report.component";
import { ViewPagosComponent } from "src/app/pages/pagos/ViewPagos/ViewPagos.component";
import { ViewMeetComponent } from "src/app/pages/meet/ViewMeet/ViewMeet.component";
import { ViewFloatpComponent } from "src/app/pages/floatPlanned/ViewFloatP/ViewFloatp.component";
import { ViewFloateComponent } from "src/app/pages/floatInAction/ViewFloatAction/ViewFloatAction.component";


export const AkdamtRoutes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "uploadFiles", component: UploadFilesComponent },
  { path: "openPeriod", component: OpenPeriodComponent },
  { path: "closePeriod", component: ClosePeriodComponent },
  { path: "reopenPeriod", component: ReopenPeriodComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "floatPlanned", component:  FloatPlannedComponent},
  { path: "floatPlanned/view", component:  ViewFloatpComponent},
  { path: "floatInAction/view", component:  ViewFloateComponent},
  { path: "floatInAction", component:  FloatInActionComponent},
  { path: "floatInAction/adAndRed", component:  AdAndRedComponent},
  { path: "floatInAction/adAndRed/view", component:  ViewAdAndRedComponent},
  { path: "floatInAction/meet", component:  MeetComponent},
  { path: "floatInAction/meet/view", component:  ViewMeetComponent},
  { path: "floatInAction/payments", component:  PaymentsComponent},
  { path: "floatInAction/payments/view", component:  ViewPagosComponent},
  { path: "reports", component:  ReportComponent} 
  
];
