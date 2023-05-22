import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SedeComponent} from "./sede/sede.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PanelMenuModule} from 'primeng/panelmenu';
import {StyleClassModule} from 'primeng/styleclass';
import { SlideMenuModule } from 'primeng/slidemenu';


@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, DialogModule, ButtonModule, DropdownModule, FormsModule, PanelMenuModule, StyleClassModule , SlideMenuModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, SedeComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, SedeComponent]
})
export class ComponentsModule {}
