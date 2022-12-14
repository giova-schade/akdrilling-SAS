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
interface OptionFloat {
  Code: string,
  name: string
}
@Component({
  selector: "app-floatInAction",
  templateUrl: "floatInAction.component.html",
  styleUrls: ["floatInAction.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class FloatInActionComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  loadingPage: boolean;
  msgs: Message[] = [];
  files: any[] = [];
  periodos!: Periodos[];
  CargaFloatFE: boolean;
  usuario!: any;
  optionsFloat!: OptionFloat[];
  PERIODO_REQ: boolean;
  datasourceFES: any;
  FesCampos: any;
  multiSortFES: any;
  loading!: boolean;
  loadingFes!: boolean;
  @ViewChild('fes') fes: any;
  floatFE = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosFloatFE: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idFloatE: new FormControl('', Validators.required),
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
    this.CargaFloatFE = false;
    this.optionsFloat = [];
    this.PERIODO_REQ = true;
    this.FesCampos = [];
    this.multiSortFES = [];
  }
  ngOnInit() {
    this.optionsFloat.push({
      Code: '01',
      name: 'Ver Float en ejecución'
    }, {
      Code: '02',
      name: 'Crear Float en ejecución'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDAFE' || this.usuario.role == 'AKDADM' ) {
      this.CargaFloatFE = true;
    }

    this.floatFE.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.floatFE.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.floatFE.controls['Role'].setValue(this.usuario.role);
    this.floatFE.statusChanges.subscribe(result => {
      if (this.floatFE.controls['PERIODO'].value != null && this.floatFE.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.master.apiGetPeriodFE(this.floatFE).subscribe({
      next: (result: any) => {
        /*Cargo float en ejecución si hay creados*/
        this.master.apiGetFEAll(this.floatFE).subscribe({
          next: (result: any) => {
            if (result.status == "ok") {
              this.datasourceFES = result.datos;
              for (let campo in this.datasourceFES[0]) {
                this.FesCampos.push({ field: campo, header: campo });
                if (campo == 'idFloatE') {
                  this.multiSortFES.push({ field: 'idFloatE', order: -1 });
                }
              }

              this.loadingFes = true;
            } else if (result.status == 'warning') {
              this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
            } else {
              this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

            }

            this.loadingPage = false;
          },
          error: (result: any) => {
            this.notify.showNotification('top', 'right', 4, 'Error al obtener los float en ejecución');
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

  Cback () {
    this.floatFE.controls['Option'].setValue({
        Code: '01',
        name: 'Ver ingreso'
    });
}
  get DatosFloatFE(): FormArray {
    return this.floatFE.get("DatosFloatFE") as FormArray;
  }

  applyFilterGlobalFES($event: any, stringVal: any) {
    this.fes.filterGlobal($event.target.value, 'contains');
  }
  setIdFes(event: any) {
    this.floatFE.controls['idFloatE'].setValue(event.value.date);
  }
  acceptCreateFloatE() {
    this.master.apiPostCreateFE(this.floatFE).subscribe({
      next: (result) => {

        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float en ejecución Creado!');
          this.floatFE.controls['idFloatE'].setValue(result.idBudget);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/view'], { queryParams: { idFloatE: result.idFloatE, Option: '01' } })
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {

          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorFloat' + this.floatFE.controls['PERIODO'].value['periodo'] + '.xlsx';
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
        this.notify.showNotification('top', 'right', 4, 'Error al crear Float en ejecución de ' + this.floatFE.controls['PERIODO'].value.periodo);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/floatInAction/view'], { queryParams: { idFloatE: datos.idFloatE, Option: '01' } })
  }
  crearFloatFE() {
    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un Float en ejecución');
    }


    if (this.PERIODO_REQ) {
      this.confirmationService.confirm({
        message: 'Se creara el float en ejecución con el periodo ' + this.floatFE.controls['PERIODO'].value.periodo,
        header: 'Crear float en ejecución ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreateFloatE();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }


  }
  startCargaFloatFE() {
    this.floatFE.controls['Option'].setValue({
      Code: '02',
      name: 'Crear Float en ejecución'
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
