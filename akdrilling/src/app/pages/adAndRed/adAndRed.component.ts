import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-adAndRed",
  templateUrl: "adAndRed.component.html",
  styleUrls: ["adAndRed.component.scss"],
  providers : [NotificationsComponent]
})
export class AdAndRedComponent implements OnInit {

    constructor(){

    }
    ngOnInit(){
        
    }

 }
