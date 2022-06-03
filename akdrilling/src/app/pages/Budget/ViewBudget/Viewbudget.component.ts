import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../../pages/notifications/notifications.component';
import { MaestrosService } from '../../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Message, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { BlockLike, collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { AuthService } from '../../../services/auth.services';
import { arrow } from "@popperjs/core";
import { ActivatedRoute } from '@angular/router';
import { param } from "jquery";
interface Periodos {
  periodo: string,
  date: string
}

interface OptionBudget {
  Code: string,
  name: string
}

@Component({
  selector: "app-budget",
  templateUrl: "Viewbudget.component.html",
  styleUrls: ["Viewbudget.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ViewBudgetComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;



  files: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  optionsBudget!: OptionBudget[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposBd: any;
  multiSortMetaBD: any;
  loading!: boolean;
  datasourceBD: any;
  urlDounload: string;
  datasourceBdgs: any;
  BudgtsCampos: any;
  multiSortBDGS: any;
  @ViewChild('bds') bds: any;
  @ViewChild('bdgs') bdgs: any;
  loadingBdgs!: boolean;
  budget = new FormGroup({
    idBudget: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosBudget: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    montoTotalBudget: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required)
    
  })

  mainForm = new FormGroup({});


  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.loadingPage = true;
    this.loading = true;
    this.periodos = [];
    this.optionsBudget = [];
    this.PERIODO_REQ = false;
    this.camposBd = [];
    this.multiSortMetaBD = [];
    this.datasourceBD = [];
    this.urlDounload = '';
    this.BudgtsCampos = [];
    this.multiSortBDGS = [];
  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();
    this.budget.controls['IdCia'].setValue(this.usuario.info.sede.IdCia);
    this.budget.controls['NomSede'].setValue(this.usuario.info.sede.NomSede);
    this.budget.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        console.log(params)
        this.budget.controls['idBudget'].setValue(params.idBudget);
        this.budget.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver Budget'
        });


        /*obtengo los datos del budget a partir del id del budget*/
        this.master.GetBudget(this.budget).subscribe({
          next: (response: any) => {

            this.budget.controls['PERIODO'].setValue({
              periodo: response.periodo,
              date: response.date
            });

            this.budget.controls['estado'].setValue(response.estado);
            this.budget.controls['montoTotalBudget'].setValue(response.montoTotalBudget);
            this.budget.controls['date'].setValue(response.date);

            

            this.datasourceBD = response.datos;
            this.clearFormArray(this.DatosBudget);
            this.multiSortMetaBD = [];
            this.loading=false;
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
              if (response.downloadBudget.length > 0) {
                this.urlDounload = response.downloadBudget;
              } else {
                this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

              }
              this.loadingPage=false;
              
              response.datos.forEach((x: any, y: any) => {

                this.DatosBudget.push(new FormGroup({}))


                /*
                for (let i in x) {
                  this.tControls[y].addControl([i].toString(), new FormControl('', Validators.required));
                  this.tControls[y].controls[i].setValue(x[i]);

                }*/

              })

            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
              this.loadingPage=false;

            }
          },
          error: (result: any) => {

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el budget ' + this.budget.controls['idBudget'].value);
            this.loadingPage=false;

          },
          complete: () => {

          }
        })
      })



  }

  
  get bdts() { return this.budget.controls; }
  //get bd() { return this.bdts.DatosBudget as FormArray; }

  get DatosBudget(): FormArray {
    return this.budget.get("DatosBudget") as FormArray;
  }

  get tControls() { return this.DatosBudget.controls as FormGroup[]; }



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
        a.download = 'Budget' + this.budget.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }

  }

  snakeChart(data:any, chartContainer:any){
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
