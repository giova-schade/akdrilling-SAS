import { Routes } from "@angular/router";
import { ViewBudgetComponent } from "src/app/pages/Budget/ViewBudget/Viewbudget.component";
import { HomeComponent } from "src/app/pages/home/home.component";

import { BudgetComponent } from "../../pages/Budget/budget.component";
export const AkdabrrhhRoutes: Routes = [
  { path: "Home", component: HomeComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
];
