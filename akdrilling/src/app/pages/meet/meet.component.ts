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
    if (this.usuario.role == 'AKDAMT' || this.usuario.role == 'AKDAAMT' || this.usuario.role == 'AKDADM') {
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
    this.master.apiGetPeriodMT(this.meet).subscribe({
      next: (result: any) => {
        /*Cargo meet si hay creados*/
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
        if (result.status == "ok") {
          if (result.datos.length) {



            if (result.status == "ok") {
              result.datos.forEach((x: any) => {
                this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
              })
            } else if (result.status == "warning") {
              this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
            } else {
              this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

            }

          }
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los periodos');
        this.loadingPage = false;
      },
      complete: () => { }
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
  acceptCreateMeet() {
    this.master.apiPostCreateMT(this.meet).subscribe({
      next: (result) => {

        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Meet Creado!');
          this.meet.controls['idMeet'].setValue(result.idBudget);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/view'], { queryParams: { idMeet: result.idMeet, Option: '01' } })
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {

          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorMeet' + this.meet.controls['PERIODO'].value['periodo'] + '.xlsx';
              a.click();
              URL.revokeObjectURL(objectUrl);
            })
            this.notify.showNotification('top', 'right', 4, 'Debe revisar los errores encontrados');

          } else {
            this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
          }


        }
        this.loadingPage = false;
      },
      error: (result) => {
        this.notify.showNotification('top', 'right', 4, 'Error al crear Meet de ' + this.meet.controls['PERIODO'].value.periodo);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/view'], { queryParams: { idMeet: datos.idMeet, Option: '01' } })
  }
  crearMeet() {
    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un Meet');
    }


    if (this.PERIODO_REQ) {
      this.confirmationService.confirm({
        message: 'Se creara el Meet con el periodo ' + this.meet.controls['PERIODO'].value.periodo,
        header: 'Crear Meet ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreateMeet();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }


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
