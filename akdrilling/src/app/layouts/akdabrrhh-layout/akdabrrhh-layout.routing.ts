import { Routes } from "@angular/router";
import { ViewBudgetComponent } from "src/app/pages/Budget/ViewBudget/Viewbudget.component";
import { HomeComponent } from "src/app/pages/home/home.component";


import { BudgetComponent } from "../../pages/Budget/budget.component";
import { ReportComponent } from "src/app/pages/report/report.component";
import { ViewRevenueComponent } from "src/app/pages/revenue/ViewRevenue/ViewRevenue.component";
import { RevenueComponent } from "src/app/pages/revenue/revenue.component";
export const AkdabrrhhRoutes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "reports", component:  ReportComponent},
  { path: "revenue", component: RevenueComponent },
  { path: "revenue/view", component:  ViewRevenueComponent},

];
