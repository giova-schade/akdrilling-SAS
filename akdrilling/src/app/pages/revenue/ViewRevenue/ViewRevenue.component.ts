import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../../pages/notifications/notifications.component';
import { MaestrosService } from '../../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, SortEvent } from 'primeng/api';
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

interface Option {
  Code: string,
  name: string
}

@Component({
  selector: "app-viewRevenue",
  templateUrl: "ViewRevenue.component.html",
  styleUrls: ["ViewRevenue.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ViewRevenueComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;



  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  options!: Option[];
  PERIODO_REQ: boolean;
  testForm!: any;
  campos: any;
  multiSortMeta: any;
  loading!: boolean;
  datasource: any;
  urlDounload: string;
  datasources: any;
  RevCampos: any;
  items!: MenuItem[];
  activeIndex: number;
  multiSortS: any;
  @ViewChild('Rev') Rev: any;
  loadingBdgs!: boolean;
  CargaRevenue: boolean;

  revenue = new FormGroup({
    idRevenue: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosRevenue: new FormArray([]),
    Option: new FormControl('', Validators.required),
    montoTotalRevenue: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    Rol: new FormControl('', Validators.required)

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
    this.loadingPage = true;
    this.loading = true;
    this.periodos = [];
    this.options = [];
    this.PERIODO_REQ = false;
    this.campos = [];
    this.multiSortMeta = [];
    this.datasource = [];
    this.urlDounload = '';
    this.RevCampos = [];
    this.multiSortS = [];
    this.activeIndex = 0;
    this.CargaRevenue = false;


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
    this.revenue.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.revenue.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.revenue.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params)
        this.revenue.controls['idRevenue'].setValue(params.idRevenue);
        this.revenue.controls['Rol'].setValue(params.rol);
        this.revenue.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver ingreso'
        });


        /*obtengo los datos del ingreso a partir del id del ingreso*/
        this.master.GetRevenue(this.revenue).subscribe({
          next: (response: any) => {
            this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
            this.revenue.controls['PERIODO'].setValue({
              periodo: response.periodo,
              date: response.date
            });

            this.revenue.controls['estado'].setValue(response.estado);
            this.revenue.controls['montoTotalRevenue'].setValue(response.montoTotalRevenue);
            this.revenue.controls['date'].setValue(response.date);
            console.log(response.estado)
            if (response.estado == 'Creado') {
              if (this.usuario.role == 'AKDABOP' || this.usuario.role == 'AKDADM') {
                this.CargaRevenue = true;
              }
              
            }


            this.datasource = response.datos;
            this.clearFormArray(this.DatosRevenue);
            this.multiSortMeta = [];
            this.loading = false;
            if (response.status == "ok") {
              if (response.datos.length > 0) {
                for (let i in response.datos[0]) {
                  this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                }
              }
              for (let i in this.mainForm.controls) {
                this.campos.push({ field: i, header: i })
                if (i == 'idcia') {
                  this.multiSortMeta.push({ field: i, order: -1 });
                }
              }
              if (response.download.length > 0) {
                this.urlDounload = response.download;
              } else {
                this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

              }
              this.loadingPage = false;

              response.datos.forEach((x: any, y: any) => {

                this.DatosRevenue.push(new FormGroup({}))



              })

            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
              this.loadingPage = false;

            }
          },
          error: (result: any) => {

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el ingreso ' + this.revenue.controls['idRevenue'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get revenues() { return this.revenue.controls; }

  get DatosRevenue(): FormArray {
    return this.revenue.get("DatosRevenue") as FormArray;
  }

  get tControls() { return this.DatosRevenue.controls as FormGroup[]; }



  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadBD() {
    if (this.urlDounload.length > 0) {
      this.master.download(this.urlDounload).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Ingreso' + this.revenue.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }

  snakeChart(data: any, chartContainer: any) {
  }


  applyFilterGlobalBD($event: any, stringVal: any) {
    this.Rev.filterGlobal($event.target.value, 'contains');
  }

  applyFilterGlobalBDS($event: any, stringVal: any) {
    this.Rev.filterGlobal($event.target.value, 'contains');
  }

  filter(aa: any) {
    console.log(aa)
  }
  clear(table: Table) {
    table.clear();
  }
  closeRevenue() {
    this.master.postCloseRevenue(this.revenue).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'Ingreso Cerrado!');
          this.router.navigate(['/' + this.usuario.role + '/revenue/'], { queryParams: {} })

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
  CerrarRevenue() {
    this.loadingPage = false;
    this.confirmationService.confirm({
      message: 'Se cerrara el ingreso ' + this.revenue.controls['idRevenue'].value,
      header: 'Cerrar revenue ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loadingPage = true;
        this.closeRevenue();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }

}
