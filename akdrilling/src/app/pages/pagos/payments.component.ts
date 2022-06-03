import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-payments",
  templateUrl: "payments.component.html",
  styleUrls: ["payments.component.scss"],
  providers : [NotificationsComponent]
})
export class PaymentsComponent implements OnInit {

    constructor(){

    }
    ngOnInit(){
        
    }

 }
