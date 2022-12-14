import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';
import { MaestrosService } from '../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { BlockLike, collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { AuthService } from '../../services/auth.services';
import { arrow } from "@popperjs/core";
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
interface Periodos {
  periodo: string,
  date: string
}

interface Departamentos {
  codigo: string,
  name: string
}
interface OptionBudget {
  Code: string,
  name: string
}

@Component({
  selector: "app-budget",
  templateUrl: "budget.component.html",
  styleUrls: ["budget.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class BudgetComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  departamentos: Departamentos[] = []
  periodos!: Periodos[];
  optionsBudget!: OptionBudget[];
  PERIODO_REQ: boolean;
  camposBd: any;
  multiSortMetaBD: any;
  loading!: boolean;
  datasourceBD: any;
  urlDounload: string;
  datasourceBdgs: any;
  BudgtsCampos: any;
  multiSortBDGS: any;
  CargaBudget: boolean;
  items!: MenuItem[];
  @ViewChild('bds') bds: any;
  @ViewChild('bdgs') bdgs: any;
  loadingBdgs!: boolean;
  budget = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosBudget: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idBudget: new FormControl('', Validators.required),
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
    private router: Router
  ) {
    this.loadingPage = false;
    this.periodos = [];
    this.departamentos = [];
    this.optionsBudget = [];
    this.PERIODO_REQ = false;
    this.camposBd = [];
    this.multiSortMetaBD = [];
    this.datasourceBD = [];
    this.urlDounload = '';
    this.BudgtsCampos = [];
    this.multiSortBDGS = [];
    this.CargaBudget = false;
  }
  ngOnInit() {

    this.optionsBudget.push({
      Code: '01',
      name: 'Ver budget'
    }, {
      Code: '02',
      name: 'Crear budget'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDABRRHH' || this.usuario.role == 'AKDABOP' || this.usuario.role == 'AKDABDF' || this.usuario.role == 'AKDADM') {
      this.CargaBudget = true;
    }
    if (this.usuario.role == 'AKDADM') {
      this.departamentos.push({
        codigo: 'AKDABRRHH',
        name: 'Departamento de Recursos Humanos'
      }, {
        codigo: 'AKDABOP',
        name: 'Departamento de Operaciones'
      }, {
        codigo: 'AKDABDF',
        name: 'Departamento de Finanzas'
      })
    }

    this.budget.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.budget.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.budget.controls['Role'].setValue(this.usuario.role);
    this.budget.statusChanges.subscribe(result => {
      if (this.budget.controls['PERIODO'].value != null && this.budget.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    /*Cargo Budget si hay creados*/
    this.master.getGetBudgets(this.budget).subscribe({
      next: (result: any) => {

        if (result.status == "ok") {
          if (result.datos.length) {
            this.datasourceBdgs = result.datos;
            for (let campo in this.datasourceBdgs[0]) {
              if(campo != 'rol'){
                this.BudgtsCampos.push({ field: campo, header: campo });
              }

              if (campo == 'idBudget') {
                this.multiSortBDGS.push({ field: 'idBudget', order: -1 });
              }

            }

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
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los budgets');
        this.loadingPage = false;
      },
      complete: () => {

      }

    })
    if (this.usuario.role == "AKDABRRHH" || this.usuario.role == "AKDABOP" || this.usuario.role == "AKDABDF" || this.usuario.role == "AKDADM") {
      this.master.getPeriodBudget(this.budget).subscribe({
        next: (result: any) => {

          if (result.status == "ok") {
            result.datos.forEach((x: any) => {
              this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2] , date: x.date });
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
  get bdts() { return this.budget.controls; }
  //get bd() { return this.bdts.DatosBudget as FormArray; }

  get DatosBudget(): FormArray {
    return this.budget.get("DatosBudget") as FormArray;
  }

  get tControls() { return this.DatosBudget.controls as FormGroup[]; }

Cback () {
        this.budget.controls['Option'].setValue({
            Code: '01',
            name: 'Ver ingreso'
        });
    }

  setDepto(event: any) {
    this.budget.controls['Role'].setValue(event.value.codigo);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  acceptCreateBudget() {
    this.master.postCreaBudget(this.budget).subscribe({
      next: (result) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Budget Creado y actualizado!');
          this.budget.controls['idBudget'].setValue(result.idBudget);
          this.loadingPage = true;
          this.router.navigate(['/' + this.usuario.role + '/budget/view'], { queryParams: { idBudget: result.idBudget, Option: '01' , rol : result.rol} })
        } else if (result.status == "warning") {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          if (result.hasOwnProperty("urlResutlado")) {
            this.master.download(result.urlResutlado).subscribe(blob => {
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = 'ErrorBudget' + this.budget.controls['PERIODO'].value['periodo'] + '.xlsx';
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

        this.notify.showNotification('top', 'right', 4, 'Error al crear o actualizar el Budget de ' + this.budget.controls['PERIODO'].value.periodo + ', verifique que el archivo se encuentra cerrado');
        this.deleteFile(0);
        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }
  setIdBdg(event: any) {
    this.budget.controls['idBudget'].setValue(event.value.date);
  }
  startBudget() {
    this.budget.controls['Option'].setValue({
      Code: '02',
      name: 'Crear budget'
    });
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/budget/view'], { queryParams: { idBudget: datos.idBudget, Option: '01' , rol: datos.rol } })
  }

  cargarBudget() {
    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un budget');
    }
    if (this.files.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para crear un budget');
    }

    if (this.usuario.role == 'AKDADM') {
      this.budget.controls['file'].setValue(this.files[0]);
      if (this.PERIODO_REQ && this.files.length > 0 && this.budget.controls['Role'].value != 'AKDADM') {
        this.confirmationService.confirm({
          message: 'Se cargara el Budget con el archivo ' + this.files[0].name,
          header: 'Crear budget ',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.loadingPage = true;
            this.acceptCreateBudget();
          },
          reject: () => {
            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
          },
          key: "positionDialog"
        });
      } else {
        this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un departamento');

      }
    } else {
      this.budget.controls['file'].setValue(this.files[0]);
      if (this.PERIODO_REQ && this.files.length > 0) {
        this.confirmationService.confirm({
          message: 'Se cargara el Budget con el archivo ' + this.files[0].name,
          header: 'Crear budget ',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.loadingPage = true;
            this.acceptCreateBudget();
          },
          reject: () => {
            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
          },
          key: "positionDialog"
        });
      }
    }

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
  viewBudget() {

  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
        if (this.files.length == 0) {
          item.progress = 0;
          this.files.push(item);
        } else {
          this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un budget');
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
