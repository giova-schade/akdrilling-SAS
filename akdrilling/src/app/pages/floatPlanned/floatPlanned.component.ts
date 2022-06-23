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
  selector: "app-floatPlanned",
  templateUrl: "floatPlanned.component.html",
  styleUrls: ["floatPlanned.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class FloatPlannedComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  loadingPage: boolean;
  msgs: Message[] = [];
  files: any[] = [];
  periodos!: Periodos[];
  CargaFloatFP: boolean;
  usuario!: any;
  optionsFloat!: OptionFloat[];
  PERIODO_REQ: boolean;
  datasourceFPS: any;
  FpsCampos: any;
  multiSortFPS: any;
  loading!: boolean;
  loadingFps!: boolean;
  @ViewChild('fps') fps: any;
  floatFP = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosFloatFP: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idFloatP: new FormControl('', Validators.required),
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
    this.CargaFloatFP = false;
    this.optionsFloat = [];
    this.PERIODO_REQ = true;
    this.FpsCampos = [];
    this.multiSortFPS = [];
  }
  ngOnInit() {
    this.optionsFloat.push({
      Code: '01',
      name: 'Ver Float planificado'
    }, {
      Code: '02',
      name: 'Crear Float planificado'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDAFP' || this.usuario.role == 'AKDAAFP' || this.usuario.role == 'AKDADM') {
      this.CargaFloatFP = true;
    }

    this.floatFP.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.floatFP.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.floatFP.controls['Role'].setValue(this.usuario.role);
    this.floatFP.statusChanges.subscribe(result => {
      if (this.floatFP.controls['PERIODO'].value != null && this.floatFP.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.master.apiGetPeriodFP(this.floatFP).subscribe({
      next: (result: any) => {
        /*Cargo float planificado si hay creados*/
        this.master.apiGetFPAll(this.floatFP).subscribe({
          next: (result: any) => {
            if (result.status == "ok") {
              this.datasourceFPS = result.datos;
              for (let campo in this.datasourceFPS[0]) {
                this.FpsCampos.push({ field: campo, header: campo });
                if (campo == 'idFloatP') {
                  this.multiSortFPS.push({ field: 'idFloatP', order: -1 });
                }
              }

              this.loadingFps = true;
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
                this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2] , date: x.date });
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

  get DatosFloatFP(): FormArray {
    return this.floatFP.get("DatosFloatFP") as FormArray;
  }

  applyFilterGlobalFPS($event: any, stringVal: any) {
    this.fps.filterGlobal($event.target.value, 'contains');
  }
  setIdFps(event: any) {
    this.floatFP.controls['idFloatP'].setValue(event.value.date);
  }
  acceptCreateFloatP() {
    this.master.apiPostCreateFP(this.floatFP).subscribe({
      next: (result) => {

        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float Planificado Creado!');
          this.floatFP.controls['idFloatP'].setValue(result.idBudget);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/floatPlanned/view'], { queryParams: { idFloatP: result.idFloatP, Option: '01' } })
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {

          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorFloat' + this.floatFP.controls['PERIODO'].value['periodo'] + '.xlsx';
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
        this.notify.showNotification('top', 'right', 4, 'Error al crear Float planificado de ' + this.floatFP.controls['PERIODO'].value.periodo);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/floatPlanned/view'], { queryParams: { idFloatP: datos.idFloatP, Option: '01' } })
  }
  crearFloatFP() {
    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un Float Planificado');
    }


    if (this.PERIODO_REQ) {
      this.confirmationService.confirm({
        message: 'Se creara el float planificado con el periodo ' + this.floatFP.controls['PERIODO'].value.periodo,
        header: 'Crear float planificado ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreateFloatP();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }


  }
  startCargaFloatFP() {
    this.floatFP.controls['Option'].setValue({
      Code: '02',
      name: 'Crear Float Planificado'
    });
  }

  clear(table: Table) {
    table.clear();
  }


}
