import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';
import { MaestrosService } from '../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { MenuItem, Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from "primeng/table";
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';
interface Periodos {
  periodo: string,
  date: string
}

interface TypeDistribution {
  codigo: string,
  name: string
}
interface OptionDistribution {
  Code: string,
  name: string
}

@Component({
  selector: "app-distribution",
  templateUrl: "distribution.component.html",
  styleUrls: ["distribution.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class DistributionComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  typeDistribution: TypeDistribution[] = []
  periodos!: Periodos[];
  optionsDistribution!: OptionDistribution[];
  PERIODO_REQ: boolean;
  camposBd: any;
  multiSortMetaBD: any;
  loading!: boolean;
  datasourceBD: any;
  urlDounload: string;
  datasourceBdgs: any;
  BudgtsCampos: any;
  multiSortBDGS: any;
  Cargadistribution: boolean;
  items!: MenuItem[];
  @ViewChild('bds') bds: any;
  @ViewChild('bdgs') bdgs: any;
  loadingBdgs!: boolean;
  distribution = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosDistribution: new FormArray([]),
    Option: new FormControl('', Validators.required),
    IdDistribution: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    typeDist: new FormControl('', Validators.required),
  })

  mainForm = new FormGroup({});


  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loadingPage = false;
    this.periodos = [];
    this.typeDistribution = [];
    this.optionsDistribution = [];
    this.PERIODO_REQ = false;
    this.camposBd = [];
    this.multiSortMetaBD = [];
    this.datasourceBD = [];
    this.urlDounload = '';
    this.BudgtsCampos = [];
    this.multiSortBDGS = [];
    this.Cargadistribution = false;
  }
  ngOnInit() {

    this.optionsDistribution.push({
      Code: '01',
      name: 'Ver distribution'
    }, {
      Code: '02',
      name: 'Crear distribution'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDABDF' || this.usuario.role == 'AKDADM') {
      this.Cargadistribution = true;
    }

    this.typeDistribution.push({
      codigo: 'budgetDistribution',
      name: 'Distribución Budget'
    },
      {
        codigo: 'executedDistribution',
        name: 'Distribución Ejecutado'
      }
    )

    this.distribution.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.distribution.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.distribution.controls['Role'].setValue(this.usuario.role);
    this.distribution.statusChanges.subscribe(result => {
      if (this.distribution.controls['PERIODO'].value != null &&
        this.distribution.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;
      }

    })
    /*Cargo distribution si hay creados*/
    this.master.getGetDistributions(this.distribution).subscribe({
      next: (result: any) => {

        if (result.status == "ok") {
          if (result.datos.length) {
            this.datasourceBdgs = result.datos;
            for (let campo in this.datasourceBdgs[0]) {
              if (campo != 'rol') {
                this.BudgtsCampos.push({ field: campo, header: campo });
              }

              if (campo == 'IdDistribution') {
                this.multiSortBDGS.push({ field: 'IdDistribution', order: -1 });
              }

            }

            this.BudgtsCampos.sort((a: any, b: any) => {
              if (a.field === 'IdDistribution' && b.field !== 'IdDistribution') {
                return -1;
              } else if (a.field !== 'IdDistribution' && b.field === 'IdDistribution') {
                return 1;
              } else if (a.field === 'IdDistribution' && b.field === 'IdDistribution') {
                return 0;
              } else if (a.field === 'Periodo' && b.field !== 'Periodo') {
                return -1;
              } else if (a.field !== 'Periodo' && b.field === 'Periodo') {
                return 1;
              } else if (a.field === 'Periodo' && b.field === 'Periodo') {
                return 0;
              } else {
                return a.field.localeCompare(b.field);
              }
            });

            this.loadingBdgs = true;
          }
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

        this.loadingPage = false;
      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener las distribuciones');
        this.loadingPage = false;
      },
      complete: () => {

      }

    })
    if (this.usuario.role == "AKDABRRHH" || this.usuario.role == "AKDABOP" || this.usuario.role == "AKDABDF" || this.usuario.role == "AKDADM") {
      this.master.getPeriodDistribution(this.distribution).subscribe({
        next: (result: any) => {

          if (result.status == "ok") {
            result.datos.forEach((x: any) => {
              this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
            })
          } else if (result.status == "warning") {
            this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          } else {
            this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

          }

        },
        error: (result) => {

          this.notify.showNotification('top', 'right', 4, 'Error al obtener los periodos');
          this.loadingPage = false;
        },
        complete: () => {

        }
      })
    }





  }
  get bdts() { return this.distribution.controls; }
  //get bd() { return this.bdts.DatosDistribution as FormArray; }

  get DatosDistribution(): FormArray {
    return this.distribution.get("DatosDistribution") as FormArray;
  }

  get tControls() { return this.DatosDistribution.controls as FormGroup[]; }

  Cback() {
    this.distribution.controls['Option'].setValue({
      Code: '01',
      name: 'Ver ingreso'
    });
  }

  setTypeDist(event: any) {
    this.distribution.controls['typeDist'].setValue(event.value.codigo);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  acceptCreateDistribution() {
    this.master.postCreaDistribution(this.distribution).subscribe({
      next: (result) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Distribucion Creado y actualizado!');
          this.distribution.controls['IdDistribution'].setValue(result.IdDistribution);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/distribution/view'], { queryParams: { IdDistribution: result.IdDistribution, Option: '01'} })
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
  setIdBdg(event: any) {
    this.distribution.controls['IdDistribution'].setValue(event.value.date);
  }
  startdistribution() {
    this.distribution.controls['Option'].setValue({
      Code: '02',
      name: 'Crear distribution'
    });
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/distribution/view'], { queryParams: { IdDistribution: datos.IdDistribution, Option: '01' } })
  }

  cargarDistribution() {
    if (!this.PERIODO_REQ) {
      return this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear una distribución.');
    }
    if (this.files.length == 0) {
      return this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para crear una distribución.');
    }
    if (this.distribution.controls['typeDist'].value == "") {
      return this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un tipo de distribución.');
    }
    
    this.distribution.controls['file'].setValue(this.files[0]);
    this.confirmationService.confirm({
      message: 'Se cargara la distribución con el archivo ' + this.files[0].name,
      header: 'Crear distribución ',
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
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
  uploadFilesSimulator(index: number) {

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
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
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
}
