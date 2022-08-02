import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';

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
interface OptionPay {
  Code: string,
  name: string
}

@Component({
  selector: "app-payments",
  templateUrl: "payments.component.html",
  styleUrls: ["payments.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class PaymentsComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  loadingPage: boolean;
  msgs: Message[] = [];
  files: any[] = [];
  periodos!: Periodos[];
  CargaPayments: boolean;
  usuario!: any;
  optionsPay!: OptionPay[];
  PERIODO_REQ: boolean;
  datasourcePAY: any;
  PayCampos: any;
  multiSortPAY: any;
  loading!: boolean;
  loadingPay!: boolean;
  @ViewChild('pay') pay: any;
  payments = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosPayments: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idPay: new FormControl('', Validators.required),
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
    this.CargaPayments = false;
    this.optionsPay = [];
    this.PERIODO_REQ = true;
    this.PayCampos = [];
    this.multiSortPAY = [];
  }
  ngOnInit() {
    this.optionsPay.push({
      Code: '01',
      name: 'Ver Float planificado'
    }, {
      Code: '02',
      name: 'Crear Float planificado'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDAFP' || this.usuario.role == 'AKDAAFP' || this.usuario.role == 'AKDADM' ) {
      this.CargaPayments = true;
    }

    this.payments.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.payments.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.payments.controls['Role'].setValue(this.usuario.role);
    this.payments.statusChanges.subscribe(result => {
      if (this.payments.controls['PERIODO'].value != null && this.payments.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    
    this.master.apiPostPagosByID(this.payments).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.payments.controls['PERIODO'].setValue({
            periodo: response.periodo,
            date: response.date
          })
        }
      }
    })




    this.master.apiGetPeriodPagos(this.payments).subscribe({
      next: (result: any) => {
        /*Cargo float planificado si hay creados*/
        this.master.apiGetPagosAll(this.payments).subscribe({
          next: (result: any) => {
            if (result.status == "ok") {
              this.datasourcePAY = result.datos;
              for (let campo in this.datasourcePAY[0]) {
                this.PayCampos.push({ field: campo, header: campo });
                if (campo == 'idPay') {
                  this.multiSortPAY.push({ field: 'idPay', order: -1 });
                }
              }

              this.loadingPay = true;
            } else if (result.status == 'warning') {
              this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
            } else {
              this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

            }

            this.loadingPage = false;
          },
          error: (result: any) => {
            this.notify.showNotification('top', 'right', 4, 'Error al obtener los float planificados');
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



  get DatosPayments(): FormArray {
    return this.payments.get("DatosPayments") as FormArray;
  }

  applyFilterGlobalPAY($event: any, stringVal: any) {
    this.pay.filterGlobal($event.target.value, 'contains');
  }
  setIdPay(event: any) {
    this.payments.controls['idPay'].setValue(event.value.date);
  }
  acceptCreatePagos() {
    this.master.apiPostCreatePagos(this.payments).subscribe({
      next: (result) => {

        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float Planificado Creado!');
          this.payments.controls['idPay'].setValue(result.idBudget);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/payments/view'], { queryParams: { idPay: result.idPay, Option: '01' } })
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {

          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorFloat' + this.payments.controls['PERIODO'].value['periodo'] + '.xlsx';
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
        this.notify.showNotification('top', 'right', 4, 'Error al crear Float planificado de ' + this.payments.controls['PERIODO'].value.periodo);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/payments/view'], { queryParams: { idPay: datos.idPay, Option: '01' } })
  }
  crearPayments() {
    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un Float Planificado');
    }


    if (this.PERIODO_REQ) {
      this.confirmationService.confirm({
        message: 'Se creara el float planificado con el periodo ' + this.payments.controls['PERIODO'].value.periodo,
        header: 'Crear float planificado ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreatePagos();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }


  }
  startCargaPayments() {
    this.payments.controls['Option'].setValue({
      Code: '02',
      name: 'Crear Float Planificado'
    });
  }

  clear(table: Table) {
    table.clear();
  }


}
