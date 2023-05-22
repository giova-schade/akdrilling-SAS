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
@Component({
  selector: "app-reportBudget",
  templateUrl: "reportBudget.component.html",
  styleUrls: ["reportBudget.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportBudgetComponent implements OnInit {
  periodos!: Periodos[];
  usuario!: any;
  loadingPage: boolean;
  PERIODO_REQ: boolean;

  reportBudget= new FormGroup({
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
    this.reportBudget.controls['PERIODO'].setValue([])
    this.master.apiPostPeriodReportBudget(this.reportBudget).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reportBudget.controls['urlDownload'].setValue(result.downloadBudget);
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
  }
  DownloadBudget() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de Float Inicial');
    } else {
      this.master.download(this.reportBudget.controls['urlDownload'].value + '&PERIODO=' + this.reportBudget.controls['PERIODO'].value.date + '&IdCia=' + this.reportBudget.controls['IdCia'].value).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'Budget' + this.reportBudget.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }

}