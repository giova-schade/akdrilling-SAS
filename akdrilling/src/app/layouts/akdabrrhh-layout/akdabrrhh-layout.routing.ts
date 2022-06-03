import { Routes } from "@angular/router";
import { ViewBudgetComponent } from "src/app/pages/Budget/ViewBudget/Viewbudget.component";

import { BudgetComponent } from "../../pages/Budget/budget.component";
export const AkdabrrhhRoutes: Routes = [
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
];
