import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-reopenPeriod",
  templateUrl: "reopenPeriod.component.html",
  styleUrls: ["reopenPeriod.component.scss"],
  providers : [NotificationsComponent]
})
export class ReopenPeriodComponent implements OnInit {

    constructor(){

    }
    ngOnInit(){
        
    }

 }
