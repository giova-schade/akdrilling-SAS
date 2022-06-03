import { Routes } from "@angular/router";
import { AdAndRedComponent } from "src/app/pages/adAndRed/adAndRed.component";
import { ClosePeriodComponent } from "src/app/pages/closePeriod/closePeriod.component";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { FloatInActionComponent } from "src/app/pages/floatInAction/floatInAction.component";
import { FloatPlannedComponent } from "src/app/pages/floatPlanned/floatPlanned.component";
import { MeetComponent } from "src/app/pages/meet/meet.component";
import { OpenPeriodComponent } from "src/app/pages/openPeriod/openPeriod.component";
import { PaymentsComponent } from "src/app/pages/pagos/payments.component";
import { ReopenPeriodComponent } from "src/app/pages/reopenPeriod/reopenPeriod.component";
import { UploadFilesComponent } from "src/app/pages/UploadFiles/uploadFiles.component";

import { BudgetComponent } from "../../pages/Budget/budget.component";
import { ViewBudgetComponent } from "../../pages/Budget/ViewBudget/Viewbudget.component";
export const AkdaafeRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "uploadFiles", component: UploadFilesComponent },
  { path: "openPeriod", component: OpenPeriodComponent },
  { path: "closePeriod", component: ClosePeriodComponent },
  { path: "reopenPeriod", component: ReopenPeriodComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "floatPlanned", component:  FloatPlannedComponent},
  { path: "floatInAction", component:  FloatInActionComponent},
  { path: "floatInAction/adAndRed", component:  AdAndRedComponent},
  { path: "floatInAction/meet", component:  MeetComponent},
  { path: "floatInAction/payments", component:  PaymentsComponent}
];
