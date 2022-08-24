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

interface OptionMeet {
  Code: string,
  name: string
}

@Component({
  selector: "app-viewMeet",
  templateUrl: "ViewMeet.component.html",
  styleUrls: ["ViewMeet.component.scss"],
  providers: [NotificationsComponent, ConfirmationService, MessageService]
})
export class ViewMeetComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;


  displeyMeetDetail: boolean;
  datosDetailMeet: any;
  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  optionsMeet!: OptionMeet[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposMt: any;
  camposMtD: any;
  multiSortMetaMt: any;
  multiSortMetaMtD: any;
  loading!: boolean;
  loadingDetail!: boolean;
  datasourceMT: any;
  datasourceMTD: any;
  urlDounload: string;
  datasourceMts: any;
  multiSortmts: any;
  items!: MenuItem[];
  activeIndex: number = 0;
  @ViewChild('mt') bds: any;
  @ViewChild('mtd') bdsd: any;
  loadingmts!: boolean;
  meet = new FormGroup({
    idMeet: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosMeet: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    weekInProgress: new FormControl('', Validators.required),

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
    this.loading = true;
    this.periodos = [];
    this.optionsMeet = [];
    this.PERIODO_REQ = false;
    this.camposMt = [];
    this.multiSortMetaMt = [];
    this.datasourceMT = [];
    this.urlDounload = '';
    this.multiSortmts = [];
    this.displeyMeetDetail = false;
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
    this.meet.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.meet.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.meet.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        this.meet.controls['idMeet'].setValue(params.idMeet);
        this.meet.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver Meet'
        });


        /*obtengo los datos del meet a partir del id del meet*/
        this.master.apiPostMTByID(this.meet).subscribe({
          next: (response: any) => {
            if (response.status == "ok") {
              this.meet.controls['PERIODO'].setValue({
                periodo: response.periodo,
                date: response.date
              });

              this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
              this.meet.controls['estado'].setValue(response.estado);
              this.meet.controls['date'].setValue(response.date);
              this.meet.controls['weekInProgress'].setValue(response.weekInProgress);



              this.datasourceMT = response.datos;
              this.clearFormArray(this.DatosMeet);
              this.multiSortMetaMt = [];
              this.loading = false;
              if (response.status == "ok") {
                if (response.datos.length > 0) {
                  for (let i in response.datos[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }
                this.camposMt = [
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
                    this.multiSortMetaMt.push({ field: i, order: -1 });
                  }
                }



                if (response.downloadMeet.length > 0) {
                  this.urlDounload = response.downloadMeet;
                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                }
                this.loadingPage = false;

                response.datos.forEach((x: any, y: any) => {

                  this.DatosMeet.push(new FormGroup({}))


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

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el Meet ' + this.meet.controls['idMeet'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get mts() { return this.meet.controls; }
  //get bd() { return this.bdts.DatosMeet as FormArray; }

  get DatosMeet(): FormArray {
    return this.meet.get("DatosMeet") as FormArray;
  }

  get tControls() { return this.DatosMeet.controls as FormGroup[]; }



  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadMT() {
    if (this.urlDounload.length > 0) {
      this.master.download(this.urlDounload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Meet' + this.meet.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }

  onRowSelect(event: Event) {
    console.log(event)
  }
  SendToApprove() {
    this.master.apiPostSendApproveMT(this.meet).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Meet ' + response.idMeet + ' enviado a aprobar!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }
        this.loadingPage = false;


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al enviar a aprobar el Meet');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowAceptar() {
    this.master.apiPostApproveMT(this.meet).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Meet ' + response.idMeet + ' aprobado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al aceptar el Meet');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }

  rechazar() {
    this.master.apiPostRejectMT(this.meet).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Meet ' + response.idMeet + ' rechazado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/meet/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al rechazar el Meet');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowRechazar() {
    this.confirmationService.confirm({
      message: 'Seguro de rechazar el Meet?',
      header: 'Flujo ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loadingPage = true;
        this.rechazar();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }
  loadMeet() {
    this.master.apiPostLoadMeet(this.meet).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.master.apiPostMTByID(this.meet).subscribe({
            next: (response: any) => {
              if (response.status == "ok") {
                this.meet.controls['PERIODO'].setValue({
                  periodo: response.periodo,
                  date: response.date
                });

                this.meet.controls['estado'].setValue(response.estado);
                this.meet.controls['date'].setValue(response.date);



                this.datasourceMT = response.datos;
                this.clearFormArray(this.DatosMeet);
                this.multiSortMetaMt = [];
                this.loading = false;
                if (response.status == "ok") {
                  if (response.datos.length > 0) {
                    for (let i in response.datos[0]) {
                      this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                    }
                  }


                  for (let i in this.mainForm.controls) {
                    this.camposMt.push({ field: i, header: i })
                    if (i == 'idMeet') {
                      this.multiSortMetaMt.push({ field: i, order: -1 });
                    }
                  }
                  if (response.downloadMeet.length > 0) {
                    this.urlDounload = response.downloadMeet;
                  } else {
                    this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                  }
                  this.loadingPage = false;

                  response.datos.forEach((x: any, y: any) => {

                    this.DatosMeet.push(new FormGroup({}))


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

              this.notify.showNotification('top', 'right', 4, 'Error al obtener el Meet ' + this.meet.controls['idMeet'].value);
              this.loadingPage = false;

            },
            complete: () => {

            }
          })
          this.notify.showNotification('top', 'right', 1, 'Meet cargado correctamente!');
          this.loadingPage = false;
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.loadingPage = false;

          if (response.hasOwnProperty("urlResutlado")) {
            this.master.download(response.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorMeet' + this.meet.controls['PERIODO'].value['periodo'] + '.xlsx';
              a.click();
              URL.revokeObjectURL(objectUrl);
            })
            this.notify.showNotification('top', 'right', 4, 'Debe revisar los errores encontrados');

          } else {
            this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
          }


        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al cargar el documento');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  Procesar() {
    if (this.files.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar el Meet');
    }
    if (this.files.length > 0) {
      this.meet.controls['file'].setValue(this.files[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.files[0].name,
        header: 'Crear Meet ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.loadMeet();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }
  }
  snakeChart(data: any, chartContainer: any) {
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
        if (this.files.length == 0) {
          item.progress = 0;
          this.files.push(item);
        } else {
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un Meet');
        }

      } else {
        this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
      }

    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  onRowDblClick(event: Event, datos: any) {

    this.datosDetailMeet = datos;
    this.loadingPage = true;

    this.master.apigetDetailMeet(this.meet, datos.idbgdt5).subscribe({
      next: (response: any) => {

        if (response.status == "ok") {

          /*Cargo detalles del Meet*/
          this.displeyMeetDetail = true;
          this.datasourceMTD = response.datos;
          this.camposMtD = [
            { field: 'Razon Social', header: 'Razon Social' },
            { field: 'Categoria 5: Descripción', header: 'Categoria 5: Descripción' },
            { field: 'Monto Total USD(Mes)', header: 'Monto Total USD(Mes)' },
            { field: 'week', header: 'week' },
            { field: 'Estado', header: 'Estado' },
            { field: 'description', header: 'description'}
          ]


          this.loadingPage = false;
        } else if (response.status == 'warning') {
          this.displeyMeetDetail = false;
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.displeyMeetDetail = false;

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
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Carga en progreso.");
      return;
    }
    this.files.splice(index, 1);
  }
  applyFilterGlobalBD($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  applyFilterGlobalBDS($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  filter(aa: any) {
    console.log(aa)
  }
  clear(table: Table) {
    table.clear();
  }

}
