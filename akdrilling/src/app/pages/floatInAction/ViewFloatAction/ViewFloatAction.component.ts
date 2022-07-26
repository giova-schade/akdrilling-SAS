import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../../pages/notifications/notifications.component';
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

interface OptionFloat {
  Code: string,
  name: string
}

@Component({
  selector: "app-viewFloatfe",
  templateUrl: "ViewFloatAction.component.html",
  styleUrls: ["ViewFloatAction.component.scss"],
  providers: [NotificationsComponent, ConfirmationService, MessageService]
})
export class ViewFloateComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;


  displeyFloatDetail: boolean;
  datosDetailFloatE: any;
  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  optionsFloat!: OptionFloat[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposFe: any;
  camposFeD: any;
  multiSortMetaFE: any;
  multiSortMetaFED: any;
  loading!: boolean;
  loadingDetail!: boolean;
  datasourceFE: any;
  datasourceFED: any;
  urlDounload: string;
  datasourceFes: any;
  multiSortfes: any;
  items!: MenuItem[];
  activeIndex: number = 0;
  @ViewChild('fe') bds: any;
  @ViewChild('fed') bdsd: any;
  loadingfes!: boolean;
  floatFE = new FormGroup({
    idFloatE: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosFloatE: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required)

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
    this.optionsFloat = [];
    this.PERIODO_REQ = false;
    this.camposFe = [];
    this.multiSortMetaFE = [];
    this.datasourceFE = [];
    this.urlDounload = '';
    this.multiSortfes = [];
    this.displeyFloatDetail = false;
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
      label: 'Cerrado',
      id: '2',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }
    ];



    this.usuario = this.authService.GetuserInfo();
    this.floatFE.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.floatFE.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.floatFE.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        this.floatFE.controls['idFloatE'].setValue(params.idFloatE);
        this.floatFE.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver Float en ejecución'
        });


        /*obtengo los datos del float a partir del id del float en ejecución*/
        this.master.apiPostFEByID(this.floatFE).subscribe({
          next: (response: any) => {
            if (response.status == "ok") {
              this.floatFE.controls['PERIODO'].setValue({
                periodo: response.periodo,
                date: response.date
              });

              this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
              this.floatFE.controls['estado'].setValue(response.estado);
              this.floatFE.controls['date'].setValue(response.date);



              this.datasourceFE = response.datos;
              this.clearFormArray(this.DatosFloatE);
              this.multiSortMetaFE = [];
              this.loading = false;
              if (response.status == "ok") {
                if (response.datos.length > 0) {
                  for (let i in response.datos[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }
                this.camposFe = [
                  { field: 'idbgdt5', header: 'idbgdt5' },
                  { field: 'bdgt1', header: 'bdgt1' },
                  { field: 'bdgt2', header: 'bdgt2' },
                  { field: 'bdgt3', header: 'bdgt3' },
                  { field: 'bdgt4', header: 'bdgt4' },
                  { field: 'bdgt5', header: 'bdgt5' },
                  { field: 'budgV1', header: 'budgV1' }
                ]
                
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Week') == 0) {
                    this.camposFe.push({ field: i, header: i })
                  }
                  // this.camposFe.push({ field: i, header: i })
                  if (i == 'bdgt1') {
                    this.multiSortMetaFE.push({ field: i, order: -1 });
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Remaning') == 0) {
                    this.camposFe.push({ field: i, header: i })
                  }
                }
                /*for (let i in this.mainForm.controls) {
                  if (i.indexOf('description') == 0) {
                    this.camposFe.push({ field: i, header: i })
                  }
                }*/

                if (response.downloadFloatE.length > 0) {
                  this.urlDounload = response.downloadFloatE;
                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                }
                this.loadingPage = false;

                response.datos.forEach((x: any, y: any) => {

                  this.DatosFloatE.push(new FormGroup({}))


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

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el Float en ejecución ' + this.floatFE.controls['idFloatE'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get fes() { return this.floatFE.controls; }
  //get bd() { return this.bdts.DatosFloatE as FormArray; }

  get DatosFloatE(): FormArray {
    return this.floatFE.get("DatosFloatE") as FormArray;
  }

  get tControls() { return this.DatosFloatE.controls as FormGroup[]; }



  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadFE() {
    if (this.urlDounload.length > 0) {
      this.master.download(this.urlDounload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'FloatE' + this.floatFE.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }

  onRowSelect(event: Event) {
    console.log(event)
  }
  SendToApprove() {
    this.master.apiPostSendApproveFE(this.floatFE).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float en ejecución ' + response.idFloatE + ' enviado a aprobar!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }
        this.loadingPage = false;


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al enviar a aprobar el float en ejecución');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowAceptar() {
    this.master.apiPostApproveFE(this.floatFE).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float en ejecución ' + response.idFloatE + ' aprobado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al aceptar el Float en ejecución');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }

  rechazar() {
    this.master.apiPostRejectFE(this.floatFE).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float en ejecución ' + response.idFloatE + ' rechazado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al rechazar el Float en ejecución');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowRechazar() {
    this.confirmationService.confirm({
      message: 'Seguro de rechazar el Float en ejecución?',
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
  loadFloatFe() {
    this.master.apiPostLoadFloatE(this.floatFE).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.master.apiPostFEByID(this.floatFE).subscribe({
            next: (response: any) => {
              if (response.status == "ok") {
                this.floatFE.controls['PERIODO'].setValue({
                  periodo: response.periodo,
                  date: response.date
                });

                this.floatFE.controls['estado'].setValue(response.estado);
                this.floatFE.controls['date'].setValue(response.date);



                this.datasourceFE = response.datos;
                this.clearFormArray(this.DatosFloatE);
                this.multiSortMetaFE = [];
                this.loading = false;
                if (response.status == "ok") {
                  if (response.datos.length > 0) {
                    for (let i in response.datos[0]) {
                      this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                    }
                  }


                  for (let i in this.mainForm.controls) {
                    this.camposFe.push({ field: i, header: i })
                    if (i == 'idFloatE') {
                      this.multiSortMetaFE.push({ field: i, order: -1 });
                    }
                  }
                  if (response.downloadFloatE.length > 0) {
                    this.urlDounload = response.downloadFloatE;
                  } else {
                    this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                  }
                  this.loadingPage = false;

                  response.datos.forEach((x: any, y: any) => {

                    this.DatosFloatE.push(new FormGroup({}))


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

              this.notify.showNotification('top', 'right', 4, 'Error al obtener el Float en ejecución ' + this.floatFE.controls['idFloatE'].value);
              this.loadingPage = false;

            },
            complete: () => {

            }
          })
          this.notify.showNotification('top', 'right', 1, 'Float en ejecución cargado correctamente!');
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
              a.download = 'ErrorFloat' + this.floatFE.controls['PERIODO'].value['periodo'] + '.xlsx';
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
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar el float en ejecución');
    }
    if (this.files.length > 0) {
      this.floatFE.controls['file'].setValue(this.files[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.files[0].name,
        header: 'Crear Float en Ejecución ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.loadFloatFe();
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
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un Float en ejecución');
        }

      } else {
        this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
      }

    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  onRowDblClick(event: Event, datos: any) {

    this.datosDetailFloatE = datos;
    this.loadingPage = true;

    this.master.apigetDetailFloatE(this.floatFE, datos.idbgdt5).subscribe({
      next: (response: any) => {

        if (response.status == "ok") {

          /*Cargo detalles del float*/
          this.displeyFloatDetail = true;
          this.datasourceFED = response.datos;
          this.camposFeD = [
            { field: 'Razon Social', header: 'Razon Social' },
            { field: 'Categoria 5: Descripción', header: 'Categoria 5: Descripción' },
            { field: 'Monto Total USD(Mes)', header: 'Monto Total USD(Mes)' },
            { field: 'week', header: 'week' },
            { field: 'Estado', header: 'Estado' },
          ]


          this.loadingPage = false;
        } else if (response.status == 'warning') {
          this.displeyFloatDetail = false;
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.displeyFloatDetail = false;

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
