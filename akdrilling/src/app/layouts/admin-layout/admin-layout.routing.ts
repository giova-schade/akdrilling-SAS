import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UploadFilesComponent } from "../../pages/UploadFiles/uploadFiles.component";
import { OpenPeriodComponent } from "../../pages/openPeriod/openPeriod.component";
import { ClosePeriodComponent } from "../../pages/closePeriod/closePeriod.component";
import { ReopenPeriodComponent } from "../../pages/reopenPeriod/reopenPeriod.component";
import { BudgetComponent } from "../../pages/Budget/budget.component";
import { FloatPlannedComponent } from "../../pages/floatPlanned/floatPlanned.component";
import { FloatInActionComponent } from "../../pages/floatInAction/floatInAction.component";
import { AdAndRedComponent } from "../../pages/adAndRed/adAndRed.component";
import { MeetComponent } from "../../pages/meet/meet.component";
import { PaymentsComponent } from "../../pages/pagos/payments.component";
import { ViewBudgetComponent } from "../../pages/Budget/ViewBudget/Viewbudget.component";
import { ViewFloatpComponent } from "src/app/pages/floatPlanned/ViewFloatP/ViewFloatp.component";
export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "uploadFiles", component: UploadFilesComponent },
  { path: "openPeriod", component: OpenPeriodComponent },
  { path: "closePeriod", component: ClosePeriodComponent },
  { path: "reopenPeriod", component: ReopenPeriodComponent },
  { path: "budget", component:  BudgetComponent},
  { path: "budget/view", component:  ViewBudgetComponent},
  { path: "floatPlanned", component:  FloatPlannedComponent},
  { path: "floatPlanned/view", component:  ViewFloatpComponent},
  { path: "floatInAction", component:  FloatInActionComponent},
  { path: "floatInAction/adAndRed", component:  AdAndRedComponent},
  { path: "floatInAction/meet", component:  MeetComponent},
  { path: "floatInAction/payments", component:  PaymentsComponent}

  
];
