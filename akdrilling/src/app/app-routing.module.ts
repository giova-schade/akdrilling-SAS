import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AkdabrrhhLayoutComponent } from "./layouts/akdabrrhh-layout/akdabrrhh-layout.component";
import { AccessDenied } from "./layouts/access-denied/access-denied.component";
import { AuthGuard } from './route-routing.guards';
import { AuthService } from './services/auth.services';
import { MaestrosService } from './services/maestro.service';
import { Role } from './models/role';
import { AkdabopLayoutComponent } from "./layouts/akdabop-layout/akdabop-layout.component";
import { AkdabdfLayoutComponent } from "./layouts/akdabdf-layout/akdabdf-layout.component";
import { AkdafpLayoutComponent } from "./layouts/akdafp-layout/akdafp-layout.component";
import { AkdaafpLayoutComponent } from "./layouts/akdaafp-layout/akdaafp-layout.component";
import { AkdarfeLayoutComponent } from "./layouts/akdarfe-layout/akdarfe-layout.component";
import { AkdaafeLayoutComponent } from "./layouts/akdaafe-layout/akdaafe-layout.component";
import { AkdafeLayoutComponent } from "./layouts/akdafe-layout/akdafe-layout.component";
const routes: Routes = [
  
  {
    path: "",
    component: AdminLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDADM,
      ]
    },
    children: [
      {
        path: "AKDADM",
        loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdabrrhhLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDABRRHH,
      ]
    },
    children: [
      {
        path: "AKDABRRHH",
        loadChildren: () => import("./layouts/akdabrrhh-layout/akdabrrhh-layout.module").then(m => m.AkdabrrhhLayoutModule)
          
      }
    ]
  },
  
  {
    path: "",
    component: AkdabopLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDABOP,
      ]
    },
    children: [
      {
        path: "AKDABOP",
        loadChildren: () => import("./layouts/akdabop-layout/akdabop-layout.module").then(m => m.AkdabopLayoutModule)
          
      }
    ]
  },
  
  {
    path: "",
    component: AkdabdfLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDABDF,
      ]
    },
    children: [
      {
        path: "AKDABDF",
        loadChildren: () => import("./layouts/akdabdf-layout/akdabdf-layout.module").then(m => m.akdabdfLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdafpLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDAFP,
      ]
    },
    children: [
      {
        path: "AKDAFP",
        loadChildren: () => import("./layouts/akdafp-layout/akdafp-layout.module").then(m => m.AkdafpLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdaafpLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDAAFP,
      ]
    },
    children: [
      {
        path: "AKDAAFP",
        loadChildren: () => import("./layouts/akdaafp-layout/akdaafp-layout.module").then(m => m.akdaafpLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdafeLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDAFE,
      ]
    },
    children: [
      {
        path: "AKDAFE",
        loadChildren: () => import("./layouts/akdafe-layout/akdafe-layout.module").then(m => m.AkdafeLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdafeLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDAFE,
      ]
    },
    children: [
      {
        path: "AccessDenied",
        loadChildren: () => import("./layouts/access-denied/access-denied.module").then(m => m.AccessDeniedLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdaafeLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDAAFE,
      ]
    },
    children: [
      {
        path: "AKDAAFE",
        loadChildren: () => import("./layouts/akdaafe-layout/akdaafe-layout.module").then(m => m.AkdaafeLayoutModule)
          
      }
    ]
  },
  {
    path: "",
    component: AkdarfeLayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.AKDARFE,
      ]
    },
    children: [
      {
        path: "AKDARFE",
        loadChildren: () => import("./layouts/akdarfe-layout/akdarfe-layout.module").then(m => m.AkdarfeLayoutModule)
          
      }
    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService,
    MaestrosService
  ]
})
export class AppRoutingModule {}