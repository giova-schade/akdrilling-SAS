import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-meet",
  templateUrl: "meet.component.html",
  styleUrls: ["meet.component.scss"],
  providers : [NotificationsComponent]
})
export class MeetComponent implements OnInit {

    constructor(){

    }
    ngOnInit(){
        
    }

 }
