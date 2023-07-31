import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.services";
import { MaestrosService } from "src/app/services/maestro.service";
import { ActivatedRoute, Router } from "@angular/router";
interface Periodos {
  periodo: string,
  date: string
}
interface Proyectos {
  nameProyect: string,
  codeProyect: string
}

interface Typetable {
  codigo: string,
  name: string
}
@Component({
  selector: "app-reportBudget",
  templateUrl: "reportBudget.component.html",
  styleUrls: ["reportBudget.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportBudgetComponent implements OnInit {
  periodos!: Periodos[];
  proyectos!: Proyectos[];
  usuario!: any;
  loadingPage: boolean;
  PERIODO_REQ: boolean;
  selectedScopes: any;
  proyectlist: Array<[]>;
  typetable!: Typetable[];



  reportBudget = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    PROYECTOS: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    Role: new FormControl('', Validators.required),
    urlDownload: new FormControl('', Validators.required),
    downloadBudgetProyect: new FormControl('', Validators.required),
    typetable: new FormControl('', Validators.required),

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
    this.periodos = [];
    this.proyectos = [];
    this.loadingPage = true;
    this.PERIODO_REQ = true;
    this.selectedScopes = [];
    this.proyectlist = [];
    this.typetable = [];
  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();
    this.typetable.push({
      codigo: 'Budget',
      name: 'Budget'
    },
      {
        codigo: 'Ejecutado',
        name: 'Ejecutado'
      }
    )
    this.reportBudget.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.reportBudget.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.reportBudget.controls['Role'].setValue(this.usuario.role);
    this.reportBudget.statusChanges.subscribe(result => {
      if (this.reportBudget.controls['PERIODO'].value != null && this.reportBudget.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.datosReporteBudget();
    this.loadingPage = true;

  }
  datosReporteBudget() {
    this.periodos = [];
    this.proyectos = [];
    this.reportBudget.controls['PERIODO'].setValue([])
    this.reportBudget.controls['PROYECTOS'].setValue([])
    this.master.apiPostPeriodReportBudget(this.reportBudget).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reportBudget.controls['urlDownload'].setValue(result.downloadBudget);
          this.reportBudget.controls['downloadBudgetProyect'].setValue(result.downloadBudgetProyect);
          console.log(this.reportBudget)

        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }
      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
      },
      complete: () => {
        this.loadingPage = false;
      },

    })
    this.master.apiGetListProyectos(this.reportBudget).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.proyectos.push({ nameProyect: x.nomproyecto, codeProyect: x.idproyecto });
          })
          this.reportBudget.controls['PROYECTOS'].setValue(this.proyectos)

        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
      },
      complete: () => {
        this.loadingPage = false;
      },
    })
  }
  DownloadBudget() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float Inicial');
    } else {
      this.proyectlist = [];
      this.reportBudget.controls['PROYECTOS'].value.forEach((x: any) => this.proyectlist.push(x.codeProyect));
      this.master.download(this.reportBudget.controls['urlDownload'].value + '&PERIODO=' + this.reportBudget.controls['PERIODO'].value.date + '&IdCia=' + this.reportBudget.controls['IdCia'].value + '&listProyect=' + this.proyectlist.map(elemento => `'${elemento}'`).join(',')).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Budget' + this.reportBudget.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }
  DownloadBudgetByProyect() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float Inicial');
    } else {

      if (this.reportBudget.controls['typetable'].value != '') {
        this.proyectlist = [];
        this.reportBudget.controls['PROYECTOS'].value.forEach((x: any) => this.proyectlist.push(x.codeProyect));
        this.master.download(this.reportBudget.controls['downloadBudgetProyect'].value + '&PERIODO=' + this.reportBudget.controls['PERIODO'].value.date + '&IdCia=' + this.reportBudget.controls['IdCia'].value + '&listProyect=' + this.proyectlist.map(elemento => `'${elemento}'`).join(',')+ '&typetable='+this.reportBudget.controls['typetable'].value.codigo).subscribe(blob => {
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl
          a.download = 'BudgetPorProyectos' + this.reportBudget.controls['PERIODO'].value['periodo'] + '.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
        })
      } else {
        this.notify.showNotification('top', 'right', 3, 'Debe seleccionar una tabla');
      }



    }


  }

}