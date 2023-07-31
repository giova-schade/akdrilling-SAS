import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MaestrosService } from '../../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { MenuItem, Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from "primeng/table";
import { AuthService } from '../../../services/auth.services';
import { ActivatedRoute, Router } from '@angular/router';
interface Periodos {
  periodo: string,
  date: string
}


@Component({
  selector: "app-Viewdistribution",
  templateUrl: "Viewdistribution.component.html",
  styleUrls: ["Viewdistribution.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ViewdistributionComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  @ViewChild("fileDropRefD", { static: false }) fileDropReElD: ElementRef | any;



  files: any[] = [];
  filesD: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposBd: any;
  camposBdT: any;
  multiSortMetaBD: any;
  multiSortMetaBDT: any;
  loading!: boolean;
  datasourceBD: any;
  datasourceBDT: any;
  urlDownload: string;
  urlDownloadT: string;
  datasourceBdgs: any;
  BudgtsCampos: any;
  items!: MenuItem[];
  activeIndex: number;
  multiSortBDGS: any;
  @ViewChild('bds') bds: any;
  @ViewChild('bdgs') bdgs: any;
  loadingBdgs!: boolean;
  updateBDGDT: boolean;
  updateExecuted: boolean;
  distribution = new FormGroup({
    IdDistribution: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosDistribution: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estadoBGDT: new FormControl('', Validators.required),
    estadoExecT: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    Rol: new FormControl('', Validators.required),
    typeDist: new FormControl('', Validators.required)


  })

  mainForm = new FormGroup({});


  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadingPage = true;
    this.loading = true;
    this.periodos = [];
    this.PERIODO_REQ = false;
    this.camposBd = [];
    this.camposBdT = [];
    this.multiSortMetaBD = [];
    this.multiSortMetaBDT = [];
    this.datasourceBD = [];
    this.datasourceBDT = [];
    this.urlDownload = '';
    this.urlDownloadT = '';
    this.BudgtsCampos = [];
    this.multiSortBDGS = [];
    this.activeIndex = 0;
    this.updateBDGDT = false;
    this.updateExecuted = false;
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
      label: 'Cerrado',
      id: '1',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    }
    ];

    this.usuario = this.authService.GetuserInfo();
    this.distribution.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.distribution.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.distribution.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params)
        this.distribution.controls['IdDistribution'].setValue(params.IdDistribution);
        this.distribution.controls['Rol'].setValue(this.usuario.role);
        this.distribution.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver distribución'
        });


        /*obtengo los datos del distribution a partir del id del distribution*/
        this.master.GetDistribution(this.distribution).subscribe({
          next: (response: any) => {
            this.items.forEach((x: any, y) => { if (x.label == response.estadoBGDT) { this.activeIndex = parseInt(x.id) } })
            this.distribution.controls['PERIODO'].setValue({
              periodo: response.periodo,
              date: response.date
            });

            this.distribution.controls['estadoBGDT'].setValue(response.estadoBGDT);
            this.distribution.controls['estadoExecT'].setValue(response.estadoExecT);
            this.distribution.controls['date'].setValue(response.date);
            this.updateBDGDT = this.unlockUpdateBDGT();
            this.updateExecuted = this.unlockUpdateExecuted();


            this.datasourceBD = response.datos;
            this.datasourceBDT = response.datosT;
            this.clearFormArray(this.DatosDistribution);
            this.multiSortMetaBD = [];
            this.multiSortMetaBDT = [];
            this.loading = false;
            if (response.status == "ok") {
              if (response.datos.length > 0) {
                for (let i in response.datos[0]) {
                  this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                }
              }

              for (let i in this.mainForm.controls) {
                this.camposBd.push({ field: i, header: i })
                if (i == 'idcia') {
                  this.multiSortMetaBD.push({ field: i, order: -1 });
                }
              }
              for (let i in this.mainForm.controls) {
                this.camposBdT.push({ field: i, header: i })
                if (i == 'idcia') {
                  this.multiSortMetaBDT.push({ field: i, order: -1 });
                }
              }
              if (response.downloadDistribution.length > 0) {
                this.urlDownload = response.downloadDistribution;
              } else {
                this.notify.showNotification('top', 'right', 3, 'No hay archivo de distribución de budget para descargar ');

              }
              if (response.downloadDistributionT.length > 0) {
                this.urlDownloadT = response.downloadDistributionT;
              } else {
                this.notify.showNotification('top', 'right', 3, 'No hay archivo de distribución ejecutada para descargar');

              }
              
              this.loadingPage = false;

              response.datos.forEach((x: any, y: any) => {

                this.DatosDistribution.push(new FormGroup({}))

              })





            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
              this.loadingPage = false;

            }
          },
          error: (result: any) => {

            this.notify.showNotification('top', 'right', 4, 'Error al obtener la distribución ' + this.distribution.controls['IdDistribution'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get bdts() { return this.distribution.controls; }
  //get bd() { return this.bdts.DatosBudget as FormArray; }

  get DatosDistribution(): FormArray {
    return this.distribution.get("DatosDistribution") as FormArray;
  }

  get tControls() { return this.DatosDistribution.controls as FormGroup[]; }



  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadBD() {
    if (this.urlDownload.length > 0) {
      this.master.download(this.urlDownload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Distribution' + this.distribution.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }
  downloadBDExecT() {
    if (this.urlDownloadT.length > 0) {
      this.master.download(this.urlDownloadT).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Distribution_ejecutada_' + this.distribution.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }
  snakeChart(data: any, chartContainer: any) {
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
  closeDistributionT() {
    this.master.postCloseDistributionT(this.distribution).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Distribución budget Cerrada' );
          this.router.navigate(['/' + this.usuario.role + '/distribution/'], { queryParams: {} })

        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

      },
      error: (result: any) => {

      },
      complete: () => {
        this.loadingPage = false;

      }
    })
  }

  closeDistribution() {
    this.master.postCloseDistribution(this.distribution).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Distribución ejecutada Cerrada');
          this.router.navigate(['/' + this.usuario.role + '/distribution/'], { queryParams: {} })

        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

      },
      error: (result: any) => {

      },
      complete: () => {
        this.loadingPage = false;

      }
    })
  }

  CerrarDistributionT() {
    this.loadingPage = false;
    this.confirmationService.confirm({
      message: 'Se cerrará la distribución budget ' + this.distribution.controls['IdDistribution'].value,
      header: 'Crear distribución ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loadingPage = true;
        this.closeDistributionT();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }
  CerrarDistribution() {
    this.loadingPage = false;
    this.confirmationService.confirm({
      message: 'Se cerrará la distribución ejecutado ' + this.distribution.controls['IdDistribution'].value,
      header: 'Crear distribución ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loadingPage = true;
        this.closeDistribution();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }

  prepareFilesListD(files: Array<any>) {
    for (const item of files) {
      if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
        if (this.filesD.length == 0) {
          item.progress = 0;
          this.filesD.push(item);
        } else {
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear una distribución');
        }

      } else {
        this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
      }

    }
    if (this.fileDropReElD != undefined) {
      this.fileDropReElD.nativeElement.value = "";
    }
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
        if (this.files.length == 0) {
          item.progress = 0;
          this.files.push(item);
        } else {
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear una distribución');
        }

      } else {
        this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
      }

    }
    if (this.fileDropEl != undefined) {
      this.fileDropEl.nativeElement.value = "";
    }
  }
  onFileDroppedD($event: any) {
    this.prepareFilesListD($event);
  }
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  fileBrowseHandlerD(files: any) {
    this.prepareFilesListD(files.target.files);
  }
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
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

  deleteFileD(index: number) {
    this.filesD.splice(index, 1);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
  acceptCreateDistribution() {
    this.master.postCreaDistribution(this.distribution).subscribe({
      next: (result) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Distribucion Creado y actualizado!');
          this.distribution.controls['IdDistribution'].setValue(result.IdDistribution);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/distribution/view'], { queryParams: { IdDistribution: result.IdDistribution, Option: '01' } })
        } else if (result.status == "warning") {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorDistribution' + this.distribution.controls['PERIODO'].value['periodo'] + '.xlsx';
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

        this.notify.showNotification('top', 'right', 4, 'Error al crear o actualizar la distribucion  ' + this.distribution.controls['PERIODO'].value.periodo + ', verifique que el archivo se encuentra cerrado');
        this.deleteFile(0);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }
  ProcesarDTB() {
    this.distribution.controls['typeDist'].setValue('budgetDistribution');
    if (this.files.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar la distribución Budget');
    }
    if (this.files.length > 0) {
      this.distribution.controls['file'].setValue(this.files[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.files[0].name,
        header: 'Crear Float en Ejecución ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreateDistribution();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }
  }
  ProcesarDTE() {
    this.distribution.controls['typeDist'].setValue('executedDistribution');
    if (this.files.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar la distribución ejecutada');
    }
    if (this.files.length > 0) {
      this.distribution.controls['file'].setValue(this.files[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.files[0].name,
        header: 'Crear Float en Ejecución ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.acceptCreateDistribution();
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });
    }
  }
  unlockUpdateBDGT() {
    if (this.distribution.controls['Rol'].value == "AKDADM" && this.distribution.controls['estadoBGDT'].value == "Creado") {
      return true;
    } else if (this.distribution.controls['Rol'].value == "AKDABDF" && this.distribution.controls['estadoBGDT'].value == "Creado") {
      return true;
    } else {
      return false
    }
  }
  unlockUpdateExecuted() {
    if (this.distribution.controls['Rol'].value == "AKDADM" && this.distribution.controls['estadoExecT'].value == "Creado") {
      return true;
    } else if (this.distribution.controls['Rol'].value == "AKDABDF" && this.distribution.controls['estadoExecT'].value == "Creado") {
      return true;
    } else {
      return false
    }
  }
  handleChangedistribution(event: any) {

  }


  Volver(){
    this.router.navigate(['/' + this.usuario.role + '/distribution/'])
  }
}
