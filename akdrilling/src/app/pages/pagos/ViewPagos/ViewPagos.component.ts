import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MaestrosService } from '../../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, MessageService, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { BlockLike, collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { AuthService } from '../../../services/auth.services';
import { arrow } from "@popperjs/core";
import { ActivatedRoute, Router } from '@angular/router';
import { param } from "jquery";
import { positionElements } from "@ng-bootstrap/ng-bootstrap/util/positioning";
interface Periodos {
  periodo: string,
  date: string
}

@Component({
  selector: "app-viewPagos",
  templateUrl: "ViewPagos.component.html",
  styleUrls: ["ViewPagos.component.scss"],
  providers: [NotificationsComponent, ConfirmationService, MessageService]
})
export class ViewPagosComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;


  displeyPagosDetail: boolean;
  datosDetailPagos: any;
  datosDetailPagosNR: any;
  files: any[] = [];
  loadingPage: boolean;
  loadingPageNR: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposPagos: any;
  camposPagosD: any;
  camposPagosNR: any;
  camposPagosNRD: any;
  multiSortMetaPagos: any;
  multiSortMetaPagosNR: any;
  multiSortMetaPagosD: any;
  loading!: boolean;
  loadingDetail!: boolean;
  datasourcePagos: any;
  datasourcePagosD: any;
  datasourcePagosNR: any;
  datasourcePagosNRD: any;

  urlDounload: string;
  urlDounloadNR: string;
  items!: MenuItem[];
  activeIndex: number = 0;
  @ViewChild('pagosReg') bds: any;
  @ViewChild('pagosRegd') bdsd: any;
  @ViewChild('pagosNoreg') bdsPN: any;
  @ViewChild('pagosNoRegd') bdsPNd: any;

  pagos = new FormGroup({
    idPagos: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosPagosReg: new FormArray([]),
    DatosPagosNoReg: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
  })

  mainForm = new FormGroup({});


  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loadingPage = true;
    this.loadingPageNR = true;
    this.loading = true;
    this.periodos = [];
    this.PERIODO_REQ = false;
    this.camposPagos = [];
    this.camposPagosNR = [];
    this.multiSortMetaPagos = [];
    this.multiSortMetaPagosNR = [];
    this.datasourcePagos = [];
    this.datasourcePagosNR = [];
    this.datasourcePagosNRD = [];

    this.urlDounload = '';
    this.urlDounloadNR = '';
    this.displeyPagosDetail = false;
  }
  ngOnInit() {
    /*cargo flujo*/
    this.items = [{
      label: 'Creado',
      id: '0',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'En aprobación',
      id: '1',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Meet',
      id: '2',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Adición / Reducción',
      id: '3',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Cerrado',
      id: '4',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    }
    ];



    this.usuario = this.authService.GetuserInfo();
    this.pagos.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.pagos.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.pagos.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        this.pagos.controls['idPagos'].setValue(params.idPagos);
        this.pagos.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver pagos'
        });


        /*obtengo los datos del meet a partir del id del meet*/
        this.master.apiPostPagosByID(this.pagos).subscribe({
          next: (response: any) => {
            if (response.status == "ok") {
              this.pagos.controls['PERIODO'].setValue({
                periodo: response.periodo,
                date: response.date
              });

              this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
              this.pagos.controls['date'].setValue(response.date);



              this.datasourcePagos = response.datos;
              this.datasourcePagosNR = response.datosNR;
              console.log(this.datasourcePagos)
              this.clearFormArray(this.DatosPagosReg);
              this.clearFormArray(this.DatosPagosNoReg);
              this.multiSortMetaPagos = [];
              this.multiSortMetaPagosNR = [];
              this.loading = false;
              if (response.status == "ok") {
                if (response.datos.length > 0) {
                  for (let i in response.datos[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }
                this.camposPagos = [
                  { field: 'Nombre_Proveedor', header: 'Nombre_Proveedor' },
                  { field: 'Monto_Total_USD_Mes', header: 'Monto_Total_USD_Mes' },
                  { field: 'Observaciones', header: 'Observaciones' },
                  { field: 'Valor solicitado Part Dom', header: 'Valor solicitado Part Dom' },
                  { field: 'Valor solicitado Part IDM', header: 'Valor solicitado Part IDM' },
                  { field: 'Valor solicitado Part PTY', header: 'Valor solicitado Part PTY' },
                  { field: 'Orden_Compra', header: 'Orden_Compra' },
                  { field: 'Nro Requerimiento', header: 'Nro Requerimiento' },
                  { field: 'Codigo_Budgt_Nivel_5', header: 'Codigo_Budgt_Nivel_5' },
                  { field: 'DescripcionBudget_Nivel_1', header: 'DescripcionBudget_Nivel_1' },
                  { field: 'DescripcionBudget_Nivel_2', header: 'DescripcionBudget_Nivel_2' },
                  { field: 'DescripcionBudget_Nivel_3', header: 'DescripcionBudget_Nivel_3' },
                  { field: 'DescripcionBudget_Nivel_5', header: 'DescripcionBudget_Nivel_5' },
                  { field: 'Fecha de aprobación', header: 'Fecha de aprobación' }
                ]



                this.camposPagosNR = [
                  { field: 'Nombre_Proveedor', header: 'Nombre_Proveedor' },
                  { field: 'Monto_Total_USD_Mes', header: 'Monto_Total_USD_Mes' },
                  { field: 'Observaciones', header: 'Observaciones' },
                  { field: 'Valor solicitado Part Dom', header: 'Valor solicitado Part Dom' },
                  { field: 'Valor solicitado Part IDM', header: 'Valor solicitado Part IDM' },
                  { field: 'Valor solicitado Part PTY', header: 'Valor solicitado Part PTY' },
                  { field: 'Orden_Compra', header: 'Orden_Compra' },
                  { field: 'Nro Requerimiento', header: 'Nro Requerimiento' },
                  { field: 'Codigo_Budgt_Nivel_5', header: 'Codigo_Budgt_Nivel_5' },
                  { field: 'DescripcionBudget_Nivel_1', header: 'DescripcionBudget_Nivel_1' },
                  { field: 'DescripcionBudget_Nivel_2', header: 'DescripcionBudget_Nivel_2' },
                  { field: 'DescripcionBudget_Nivel_3', header: 'DescripcionBudget_Nivel_3' },
                  { field: 'DescripcionBudget_Nivel_5', header: 'DescripcionBudget_Nivel_5' },
                  { field: 'Fecha de aprobación', header: 'Fecha de aprobación' }
                ]
                for (let i in this.mainForm.controls) {
                  // this.camposMt.push({ field: i, header: i })
                  if (i == 'Nombre_Proveedor') {
                    this.multiSortMetaPagos.push({ field: i, order: -1 });
                    this.multiSortMetaPagosNR.push({ field: i, order: -1 });
                  }
                }



                if (response.downloadDatos.length > 0) {
                  this.urlDounload = response.downloadDatos;

                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo de pagos registrados para descargar');

                }
                if (response.downloadDatosNR.length > 0) {
                  this.urlDounloadNR = response.downloadDatosNR;

                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo de pagos no registrados para descargar');

                }
                this.loadingPage = false;
                this.loadingPageNR = false;

                response.datos.forEach((x: any, y: any) => {

                  this.DatosPagosReg.push(new FormGroup({}))
                  this.DatosPagosNoReg.push(new FormGroup({}))


                  /*
                  for (let i in x) {
                    this.tControls[y].addControl([i].toString(), new FormControl('', Validators.required));
                    this.tControls[y].controls[i].setValue(x[i]);
     
                  }*/

                })

              } else {
                this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
                this.loadingPage = false;

              }
              this.loadingPage = false;
            } else if (response.status == 'warning') {
              this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

            }

          },
          error: (result: any) => {

            this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de pagos ' + this.pagos.controls['idPagos'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get DatosPagosNoReg(): FormArray {
    return this.pagos.get("DatosPagosNoReg") as FormArray;
  }
  get DatosPagosReg(): FormArray {
    return this.pagos.get("DatosPagosReg") as FormArray;
  }




  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadPagos() {
    if (this.urlDounload.length > 0) {
      this.master.download(this.urlDounload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Pagos' + this.pagos.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }
  downloadPagosNR() {
    if (this.urlDounloadNR.length > 0) {
      this.master.download(this.urlDounloadNR).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Pagos' + this.pagos.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }



  onRowSelect(event: Event) {
    console.log(event)
  }





  onRowDblClick(event: Event, datos: any) {

    this.datosDetailPagos = datos;
    this.loadingPage = true;

    this.master.apigetDetailPagos(this.pagos, datos.Codigo_Budgt_Nivel_5).subscribe({
      next: (response: any) => {

        if (response.status == "ok") {

          /*Cargo detalles del Meet*/
          this.displeyPagosDetail = true;
          this.datasourcePagosD = response.datos;
          this.camposPagosD = [
            { field: 'Razon Social', header: 'Razon Social' },
            { field: 'Categoria 5: Descripción', header: 'Categoria 5: Descripción' },
            { field: 'Monto Total USD(Mes)', header: 'Monto Total USD(Mes)' },
            { field: 'week', header: 'week' },
            { field: 'Estado', header: 'Estado' },      
            { field: 'description', header: 'description'}
          ]


          this.loadingPage = false;
        } else if (response.status == 'warning') {
          this.displeyPagosDetail = false;
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.displeyPagosDetail = false;

          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }
      },
      error: (response: any) => {

      },
      complete: () => {
        this.loadingPage = false;
      }

    })

    console.log(datos)
  }


  applyFilterGlobalBD($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  applyFilterGlobalBDNP($event: any, stringVal: any) {
    this.bdsPN.filterGlobal($event.target.value, 'contains');
  }


  applyFilterGlobalBDS($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  applyFilterGlobalBDSNR($event: any, stringVal: any) {
    this.bdsPNd.filterGlobal($event.target.value, 'contains');
  }

  filter(aa: any) {
    console.log(aa)
  }
  clear(table: Table) {
    table.clear();
  }

}
