import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-floatInAction",
  templateUrl: "floatInAction.component.html",
  styleUrls: ["floatInAction.component.scss"],
  providers : [NotificationsComponent]
})
export class FloatInActionComponent implements OnInit {

    constructor(){

    }
    ngOnInit(){
        
    }

 }
