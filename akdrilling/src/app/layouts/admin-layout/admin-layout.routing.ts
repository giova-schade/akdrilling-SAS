import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UploadFilesComponent } from "../../pages/UploadFiles/uploadFiles.component";
import { OpenPeriodComponent } from "../../pages/openPeriod/openPeriod.component";
import { ClosePeriodComponent } from "../../pages/closePeriod/closePeriod.component";
import { ReopenPeriodComponent } from "../../pages/reopenPeriod/reopenPeriod.component";
import { RevenueComponent } from "../../pages/revenue/revenue.component";
import { BudgetComponent } from "../../pages/Budget/budget.component";
import { FloatPlannedComponent } from "../../pages/floatPlanned/floatPlanned.component";
import { FloatInActionComponent } from "../../pages/floatInAction/floatInAction.component";
import { AdAndRedComponent } from "../../pages/adAndRed/adAndRed.component";
import { ViewAdAndRedComponent } from "../../pages/adAndRed/ViewAdAndRed/ViewAdAndRed.component";
import { MeetComponent } from "../../pages/meet/meet.component";
import { HomeComponent } from "../../pages/home/home.component";
import { PaymentsComponent } from "../../pages/pagos/payments.component";
import { ViewPagosComponent } from "../../pages/pagos/ViewPagos/ViewPagos.component";
import { ViewBudgetComponent } from "../../pages/Budget/ViewBudget/Viewbudget.component";
import { ViewFloatpComponent } from "src/app/pages/floatPlanned/ViewFloatP/ViewFloatp.component";
import { ViewFloateComponent } from "src/app/pages/floatInAction/ViewFloatAction/ViewFloatAction.component";
import { ViewMeetComponent } from "src/app/pages/meet/ViewMeet/ViewMeet.component";
import { ReportComponent } from "src/app/pages/report/report.component";
import { ViewRevenueComponent } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component";

export const AdminLayoutRoutes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "uploadFiles", component: UploadFilesComponent },
  { path: "openPeriod", component: OpenPeriodComponent },
  { path: "closePeriod", component: ClosePeriodComponent },
  { path: "reopenPeriod", component: ReopenPeriodComponent },
  { path: "revenue", component: RevenueComponent },
  { path: "revenue/view", component:  ViewRevenueComponent},
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "floatPlanned", component:  FloatPlannedComponent},
  { path: "floatPlanned/view", component:  ViewFloatpComponent},
  { path: "floatInAction", component:  FloatInActionComponent},
  { path: "floatInAction/view", component:  ViewFloateComponent},
  { path: "floatInAction/adAndRed", component:  AdAndRedComponent},
  { path: "floatInAction/adAndRed/view", component:  ViewAdAndRedComponent},
  { path: "floatInAction/meet", component:  MeetComponent},
  { path: "floatInAction/meet/view", component:  ViewMeetComponent},
  { path: "floatInAction/payments", component:  PaymentsComponent},  
  { path: "floatInAction/payments/view", component:  ViewPagosComponent},  
  { path: "reports", component:  ReportComponent}  
];
