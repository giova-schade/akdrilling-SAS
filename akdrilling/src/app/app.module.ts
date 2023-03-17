import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AkdabrrhhLayoutComponent } from "./layouts/akdabrrhh-layout/akdabrrhh-layout.component";
import { AkdabopLayoutComponent } from "./layouts/akdabop-layout/akdabop-layout.component";
import { AkdabdfLayoutComponent } from "./layouts/akdabdf-layout/akdabdf-layout.component";
import { AkdafpLayoutComponent } from "./layouts/akdafp-layout/akdafp-layout.component";
import { AkdaafpLayoutComponent } from "./layouts/akdaafp-layout/akdaafp-layout.component";
import { AkdarfeLayoutComponent } from "./layouts/akdarfe-layout/akdarfe-layout.component";
import { AkdaaerfeLayoutComponent } from "./layouts/akdaaerfe-layout/akdaaerfe-layout.component";
import { AkdafeLayoutComponent } from "./layouts/akdafe-layout/akdafe-layout.component";
import { AkdarmtLayoutComponent } from "./layouts/akdarmt-layout/akdarmt-layout.component";
import { AkdaamtLayoutComponent } from "./layouts/akdaamt-layout/akdaamt-layout.component";
import { AkdamtLayoutComponent } from "./layouts/akdamt-layout/akdamt-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AccessDenied } from "./layouts/access-denied/access-denied.component";
import { AuthService } from './services/auth.services';
import { PanelModule } from 'primeng/panel';
import { AkdaafeLayoutComponent } from "./layouts/akdaafe-layout/akdaafe-layout.component";
import {DropdownModule} from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    PanelModule,
    ToastrModule.forRoot(),
    DropdownModule,
    DialogModule
  ],
  declarations: [AppComponent,
                 AdminLayoutComponent ,
                 AccessDenied , 
                 AkdabrrhhLayoutComponent, 
                 AkdabopLayoutComponent, 
                 AkdabdfLayoutComponent,
                 AkdafpLayoutComponent,
                 AkdaafpLayoutComponent,
                 AkdarfeLayoutComponent,
                 AkdaaerfeLayoutComponent,
                 AkdaafeLayoutComponent,
                 AkdafeLayoutComponent,
                 AkdarmtLayoutComponent,
                 AkdaamtLayoutComponent,
                 AkdamtLayoutComponent
               ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
