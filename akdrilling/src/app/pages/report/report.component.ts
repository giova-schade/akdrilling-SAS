import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';

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
@Component({
  selector: "app-report",
  templateUrl: "report.component.html",
  styleUrls: ["report.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportComponent implements OnInit {
  periodos!: Periodos[];
  usuario!: any;
  loadingPage: boolean;
  PERIODO_REQ: boolean;

  reports = new FormGroup({
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
    this.loadingPage = true;
    this.PERIODO_REQ = true;
  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();

    this.reports.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.reports.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.reports.controls['Role'].setValue(this.usuario.role);
    this.reports.statusChanges.subscribe(result => {
      if (this.reports.controls['PERIODO'].value != null && this.reports.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.datosReporteInicial();
    this.loadingPage = true;

  }
  datosReporteInicial() {
    this.periodos = [];
    this.master.apiPostPeriodReportFI(this.reports).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reports.controls['urlDownload'].setValue(result.downloadFI);
          console.log(this.reports)

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
  datosReporteFloatEjecucion() {
    this.periodos = [];
    this.master.apiPostPeriodReportFE(this.reports).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reports.controls['urlDownload'].setValue(result.downloadFI);
          console.log(this.reports)

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
  DownloadFI() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float Inicial');
    } else {
      this.master.download(this.reports.controls['urlDownload'].value + '&PERIODO=' + this.reports.controls['PERIODO'].value.date + '&IdCia=' + this.reports.controls['IdCia'].value).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Float Inicial' + this.reports.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }
  DownloadFE() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float en ejecucion');
    } else {
      this.master.download(this.reports.controls['urlDownload'].value + '&PERIODO=' + this.reports.controls['PERIODO'].value.date + '&IdCia=' + this.reports.controls['IdCia'].value).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Float en ejecucion' + this.reports.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }
  reporte(event: any) {
    if (event.index == 0) {
      this.datosReporteInicial();
    } else if (event.index == 1) {
      this.datosReporteFloatEjecucion();
    }
  }
}
