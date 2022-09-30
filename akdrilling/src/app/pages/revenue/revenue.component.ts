import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';
import { MaestrosService } from '../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from "primeng/table";
import { AuthService } from '../../services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router } from '@angular/router';


@Component({
    selector: "app-revenue",
    templateUrl: "revenue.component.html",
    styleUrls: ["revenue.component.scss"],
    providers: [NotificationsComponent, ConfirmationService]
})
export class RevenueComponent implements OnInit {


    mainForm = new FormGroup({});


    constructor(
        private master: MaestrosService,
        private notify: NotificationsComponent,
        private confirmationService: ConfirmationService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }
    ngOnInit() {

    }


    
}
