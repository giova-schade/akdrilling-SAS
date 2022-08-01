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
interface Periodos {
  periodo: string,
  date: string
}

interface OptionFloat {
  Code: string,
  name: string
}

@Component({
  selector: "app-viewFloatfp",
  templateUrl: "ViewFloatp.component.html",
  styleUrls: ["ViewFloatp.component.scss"],
  providers: [NotificationsComponent, ConfirmationService, MessageService]
})
export class ViewFloatpComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;


  displeyFloatDetail: boolean;
  datosDetailFloat: any;
  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  optionsFloat!: OptionFloat[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposFp: any;
  camposFpD: any;
  multiSortMetaFP: any;
  multiSortMetaFPD: any;
  loading!: boolean;
  loadingDetail!: boolean;
  datasourceFP: any;
  datasourceFPD: any;
  urlDounload: string;
  datasourceFps: any;
  multiSortfps: any;
  items!: MenuItem[];
  activeIndex: number = 0;
  @ViewChild('fp') bds: any;
  @ViewChild('fpd') bdsd: any;
  loadingfps!: boolean;
  floatFP = new FormGroup({
    idFloatP: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosFloatP: new FormArray([]),
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
    this.camposFp = [];
    this.multiSortMetaFP = [];
    this.datasourceFP = [];
    this.urlDounload = '';
    this.multiSortfps = [];
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
    this.floatFP.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.floatFP.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.floatFP.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        this.floatFP.controls['idFloatP'].setValue(params.idFloatP);
        this.floatFP.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver Float planificado'
        });


        /*obtengo los datos del float a partir del id del float planificado*/
        this.master.apiPostFPByID(this.floatFP).subscribe({
          next: (response: any) => {
            if (response.status == "ok") {
              this.floatFP.controls['PERIODO'].setValue({
                periodo: response.periodo,
                date: response.date
              });

              this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
              this.floatFP.controls['estado'].setValue(response.estado);
              this.floatFP.controls['date'].setValue(response.date);



              this.datasourceFP = response.datos;
              this.clearFormArray(this.DatosFloatP);
              this.multiSortMetaFP = [];
              this.loading = false;
              if (response.status == "ok") {
                if (response.datos.length > 0) {
                  for (let i in response.datos[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }
                this.camposFp = [
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
                    this.camposFp.push({ field: i, header: i })
                  }
                  // this.camposFp.push({ field: i, header: i })
                  if (i == 'bdgt1') {
                    this.multiSortMetaFP.push({ field: i, order: -1 });
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Remaning') == 0) {
                    this.camposFp.push({ field: i, header: i })
                  }
                }
                /*for (let i in this.mainForm.controls) {
                  if (i.indexOf('description') == 0) {
                    this.camposFp.push({ field: i, header: i })
                  }
                }*/

                if (response.downloadFloatP.length > 0) {
                  this.urlDounload = response.downloadFloatP;
                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                }
                this.loadingPage = false;

                response.datos.forEach((x: any, y: any) => {

                  this.DatosFloatP.push(new FormGroup({}))


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

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el Float planificado ' + this.floatFP.controls['idFloatP'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get fps() { return this.floatFP.controls; }
  //get bd() { return this.bdts.DatosFloatP as FormArray; }

  get DatosFloatP(): FormArray {
    return this.floatFP.get("DatosFloatP") as FormArray;
  }

  get tControls() { return this.DatosFloatP.controls as FormGroup[]; }



  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadFP() {
    if (this.urlDounload.length > 0) {
      this.master.download(this.urlDounload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'FloatP' + this.floatFP.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }

  onRowSelect(event: Event) {
    console.log(event)
  }
  SendToApprove() {
    this.master.apiPostSendApproveFP(this.floatFP).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float planificado ' + response.idFloatP + ' enviado a aprobar!');
          this.router.navigate(['/' + this.usuario.role + '/floatPlanned/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }
        this.loadingPage = false;


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al enviar a aprobar el float planificado');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowAceptar() {
    this.master.apiPostApproveFP(this.floatFP).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float planificado ' + response.idFloatP + ' aprobado!');
          this.router.navigate(['/' + this.usuario.role + '/floatPlanned/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al aceptar el Float Planificado');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }

  rechazar() {
    this.master.apiPostRejectFP(this.floatFP).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Float planificado ' + response.idFloatP + ' rechazado!');
          this.router.navigate(['/' + this.usuario.role + '/floatPlanned/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al rechazar el Float Planificado');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowRechazar() {
    this.confirmationService.confirm({
      message: 'Seguro de rechazar el Float planificado?',
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
  loadFloatFp() {
    this.master.apiPostLoadFloatP(this.floatFP).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.master.apiPostFPByID(this.floatFP).subscribe({
            next: (response: any) => {
              if (response.status == "ok") {
                this.floatFP.controls['PERIODO'].setValue({
                  periodo: response.periodo,
                  date: response.date
                });

                this.floatFP.controls['estado'].setValue(response.estado);
                this.floatFP.controls['date'].setValue(response.date);



                this.datasourceFP = response.datos;
                this.clearFormArray(this.DatosFloatP);
                this.multiSortMetaFP = [];
                this.loading = false;
                if (response.status == "ok") {
                  if (response.datos.length > 0) {
                    for (let i in response.datos[0]) {
                      this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                    }
                  }

                  /*this.camposFp = [];
                  for (let i in this.mainForm.controls) {
                    this.camposFp.push({ field: i, header: i })
                    if (i == 'idFloatP') {
                      this.multiSortMetaFP.push({ field: i, order: -1 });
                    }
                  }*/
                  if (response.downloadFloatP.length > 0) {
                    this.urlDounload = response.downloadFloatP;
                  } else {
                    this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                  }
                  this.loadingPage = false;

                  response.datos.forEach((x: any, y: any) => {

                    this.DatosFloatP.push(new FormGroup({}))


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

              this.notify.showNotification('top', 'right', 4, 'Error al obtener el Float planificado ' + this.floatFP.controls['idFloatP'].value);
              this.loadingPage = false;

            },
            complete: () => {

            }
          })
          this.notify.showNotification('top', 'right', 1, 'Float planificado cargado correctamente!');
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
              a.download = 'ErrorFloat' + this.floatFP.controls['PERIODO'].value['periodo'] + '.xlsx';
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
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar el float planificado');
    }
    if (this.files.length > 0) {
      this.floatFP.controls['file'].setValue(this.files[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.files[0].name,
        header: 'Crear Float Planificado ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.loadFloatFp();
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
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un Float Planificado');
        }

      } else {
        this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
      }

    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  onRowDblClick(event: Event, datos: any) {

    this.datosDetailFloat = datos;
    this.loadingPage = true;

    this.master.apigetDetailFloat(this.floatFP, datos.idbgdt5).subscribe({
      next: (response: any) => {

        if (response.status == "ok") {

          /*Cargo detalles del float*/
          this.displeyFloatDetail = true;
          this.datasourceFPD = response.datos;
          this.camposFpD = [
            { field: 'Razon Social', header: 'Razon Social' },
            { field: 'Categoria 5: Descripción', header: 'Categoria 5: Descripción' },
            { field: 'Monto Total USD(Mes)', header: 'Monto Total USD(Mes)' },
            { field: 'week', header: 'week' },
            { field: 'Estado', header: 'Estado' },
            { field: 'description', header: 'description'}
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
