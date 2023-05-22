import { Routes } from "@angular/router";
import { AdAndRedComponent } from "src/app/pages/adAndRed/adAndRed.component";
import { ViewAdAndRedComponent } from "src/app/pages/adAndRed/ViewAdAndRed/ViewAdAndRed.component";
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
import { ViewBudgetComponent } from "../../pages/Budget/ViewBudget/Viewbudget.component";
import { ReportComponent } from "src/app/pages/report/report.component";
import { ViewPagosComponent } from "src/app/pages/pagos/ViewPagos/ViewPagos.component";
import { ViewMeetComponent } from "src/app/pages/meet/ViewMeet/ViewMeet.component";
import { ViewFloatpComponent } from "src/app/pages/floatPlanned/ViewFloatP/ViewFloatp.component";
import { ViewFloateComponent } from "src/app/pages/floatInAction/ViewFloatAction/ViewFloatAction.component";
import { RevenueComponent } from "src/app/pages/revenue/revenue.component";
import { ViewRevenueComponent } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component";
import { ReportBudgetComponent } from "src/app/pages/reportBudget/reportBudget.component";
import { ReportFPComponent } from "src/app/pages/reportFP/reportFP.component";
import { ReportCCDComponent } from "src/app/pages/reportCCD/reportCCD.component";
import { ReportCm1Component } from "src/app/pages/reportCm1/reportCm1.component";
import { ReportCm2Component } from "src/app/pages/reportCm2/reportCm2.component";
import { ReportCm3Component } from "src/app/pages/reportCm3/reportCm3.component";
import { ReportCm4Component } from "src/app/pages/reportCm4/reportCm4.component";
import { ReportCm5Component } from "src/app/pages/reportCm5/reportCm5.component";
import { ReportCm6Component } from "src/app/pages/reportCm6/reportCm6.component";
import { ReportCm7Component } from "src/app/pages/reportCm7/reportCm7.component";
import { ReportCm8Component } from "src/app/pages/reportCm8/reportCm8.component";
import { ReportCm9Component } from "src/app/pages/reportCm9/reportCm9.component";
import { ReportCm10Component } from "src/app/pages/reportCm10/reportCm10.component";
import { ReportFEComponent } from "src/app/pages/reportFE/reportFE.component";
import { DistributionComponent } from "src/app/pages/distribution/distribution.component";
import { ViewdistributionComponent } from "src/app/pages/distribution/ViewDistribution/Viewdistribution.component";


export const AkdabdfpRoutes: Routes = [
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
  { path: "reports", component:  ReportComponent}   ,
  { path: "reports/reportBudget", component:  ReportBudgetComponent}  ,
  { path: "reports/reportFP", component:  ReportFPComponent}  ,
  { path: "reports/reportFE", component:  ReportFEComponent},
  { path: "reports/reportCCD", component:  ReportCCDComponent} ,
  { path: "reports/reportCm1", component:  ReportCm1Component},
  { path: "reports/reportCm2", component:  ReportCm2Component},
  { path: "reports/reportCm3", component:  ReportCm3Component},
  { path: "reports/reportCm4", component:  ReportCm4Component},
  { path: "reports/reportCm5", component:  ReportCm5Component},
  { path: "reports/reportCm6", component:  ReportCm6Component},
  { path: "reports/reportCm7", component:  ReportCm7Component},
  { path: "reports/reportCm8", component:  ReportCm8Component},
  { path: "reports/reportCm9", component:  ReportCm9Component},
  { path: "reports/reportCm10", component:  ReportCm10Component} ,
  { path: "distribution", component: DistributionComponent },
  { path: "distribution/view", component: ViewdistributionComponent }

];
