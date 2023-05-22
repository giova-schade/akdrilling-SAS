import { Routes } from "@angular/router";
import { ViewBudgetComponent } from "src/app/pages/Budget/ViewBudget/Viewbudget.component";
import { HomeComponent } from "src/app/pages/home/home.component";


import { BudgetComponent } from "../../pages/Budget/budget.component";
import { ReportComponent } from "src/app/pages/report/report.component";
import { ViewRevenueComponent } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component";
import { RevenueComponent } from "src/app/pages/revenue/revenue.component";
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
export const AkdabrrhhRoutes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "reports", component:  ReportComponent}  ,
  { path: "reports/reportBudget", component:  ReportBudgetComponent}  ,
  { path: "reports/reportFP", component:  ReportFPComponent} ,
  { path: "reports/reportFE", component:  ReportFEComponent},
  { path: "reports/reportCCD", component:  ReportCCDComponent}  ,
  { path: "reports/reportCm1", component:  ReportCm1Component},
  { path: "reports/reportCm2", component:  ReportCm2Component},
  { path: "reports/reportCm3", component:  ReportCm3Component},
  { path: "reports/reportCm4", component:  ReportCm4Component},
  { path: "reports/reportCm5", component:  ReportCm5Component},
  { path: "reports/reportCm6", component:  ReportCm6Component},
  { path: "reports/reportCm7", component:  ReportCm7Component},
  { path: "reports/reportCm8", component:  ReportCm8Component},
  { path: "reports/reportCm9", component:  ReportCm9Component},
  { path: "reports/reportCm10", component:  ReportCm10Component},
  { path: "revenue", component: RevenueComponent },
  { path: "revenue/view", component:  ViewRevenueComponent},
  { path: "distribution", component: DistributionComponent },
  { path: "distribution/view", component: ViewdistributionComponent }

];
