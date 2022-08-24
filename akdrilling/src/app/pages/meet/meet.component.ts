import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MaestrosService } from "src/app/services/maestro.service";
import { AuthService } from "src/app/services/auth.services";
import { ActivatedRoute, Router } from "@angular/router";
interface Periodos {
  periodo: string,
  date: string
}
interface OptionMeet {
  Code: string,
  name: string
}
@Component({
  selector: "app-meet",
  templateUrl: "meet.component.html",
  styleUrls: ["meet.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class MeetComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  loadingPage: boolean;
  msgs: Message[] = [];
  files: any[] = [];
  periodos!: Periodos[];
  CargaMeet: boolean;
  usuario!: any;
  optionsMeet!: OptionMeet[];
  PERIODO_REQ: boolean;
  datasourceMTS: any;
  MtsCampos: any;
  multiSortMTS: any;
  loading!: boolean;
  loadingMts!: boolean;
  @ViewChild('mts') mts: any;
  meet = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosMeet: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idMeet: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
  })
  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadingPage = false;
    this.periodos = [];
    this.CargaMeet = false;
    this.optionsMeet = [];
    this.PERIODO_REQ = true;
    this.MtsCampos = [];
    this.multiSortMTS = [];
  }
  ngOnInit() {
    this.optionsMeet.push({
      Code: '01',
      name: 'Ver Meet'
    }, {
      Code: '02',
      name: 'Crear Meet'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDAMT' || this.usuario.role == 'AKDARFE' || this.usuario.role == 'AKDADM') {
      this.CargaMeet = true;
    }

    this.meet.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.meet.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.meet.controls['Role'].setValue(this.usuario.role);
    this.meet.statusChanges.subscribe(result => {
      if (this.meet.controls['PERIODO'].value != null && this.meet.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    
    this.master.apiGetMTAll(this.meet).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          this.datasourceMTS = result.datos;
          for (let campo in this.datasourceMTS[0]) {
            this.MtsCampos.push({ field: campo, header: campo });
            if (campo == 'idMeet') {
              this.multiSortMTS.push({ field: 'idMeet', order: -1 });
            }
          }

          this.loadingMts = true;
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

        this.loadingPage = false;
      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los Meet');
        this.loadingPage = false;
      },
      complete: () => {

      },
    })
  }

  get DatosMeet(): FormArray {
    return this.meet.get("DatosMeet") as FormArray;
  }

  applyFilterGlobalMTS($event: any, stringVal: any) {
    this.mts.filterGlobal($event.target.value, 'contains');
  }
  setIdMts(event: any) {
    this.meet.controls['idMeet'].setValue(event.value.date);
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/view'], { queryParams: { idMeet: datos.idMeet, Option: '01' } })
  }

  startCargaMeet() {
    this.meet.controls['Option'].setValue({
      Code: '02',
      name: 'Crear Meet'
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
