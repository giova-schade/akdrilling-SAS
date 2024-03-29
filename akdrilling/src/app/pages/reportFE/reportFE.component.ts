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
@Component({
  selector: "app-reportFE",
  templateUrl: "reportFE.component.html",
  styleUrls: ["reportFE.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportFEComponent implements OnInit {
  periodos!: Periodos[];
  proyectos!: Proyectos[];
  usuario!: any;
  loadingPage: boolean;
  PERIODO_REQ: boolean;
  proyectlist: Array<[]>;

  reportFE = new FormGroup({
    PROYECTOS: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    Role: new FormControl('', Validators.required),
    urlDownload: new FormControl('', Validators.required),

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
    this.proyectlist = [];

  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();

    this.reportFE.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.reportFE.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.reportFE.controls['Role'].setValue(this.usuario.role);
    this.reportFE.statusChanges.subscribe(result => {
      if (this.reportFE.controls['PERIODO'].value != null && this.reportFE.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.datosReporteFloatEjecucion();
    this.loadingPage = true;

  }
  datosReporteFloatEjecucion() {
    this.loadingPage = true;
    this.periodos = [];
    this.reportFE.controls['PERIODO'].setValue([])
    this.master.apiPostPeriodReportFE(this.reportFE).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reportFE.controls['urlDownload'].setValue(result.downloadFE);
          console.log(this.reportFE)

        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }
        this.loadingPage = false;
      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
      },
      complete: () => {
        this.loadingPage = false;
      },

    })
    this.master.apiGetListProyectos(this.reportFE).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.proyectos.push({ nameProyect: x.nomproyecto , codeProyect: x.idproyecto });
          })
          this.reportFE.controls['PROYECTOS'].setValue(this.proyectos)

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

  DownloadFE() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float en ejecucion');
    } else {
      this.proyectlist = [];
      this.reportFE.controls['PROYECTOS'].value.forEach((x:any)  => this.proyectlist.push(x.codeProyect));
      this.master.download(this.reportFE.controls['urlDownload'].value + '&PERIODO=' + this.reportFE.controls['PERIODO'].value.date + '&IdCia=' + this.reportFE.controls['IdCia'].value+'&listProyect='+this.proyectlist.map(elemento => `'${elemento}'`).join(',')).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Float en ejecucion' + this.reportFE.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }
}