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
  selector: "app-reportCCD",
  templateUrl: "reportCCD.component.html",
  styleUrls: ["reportCCD.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportCCDComponent implements OnInit {
  periodos!: Periodos[];
  proyectos!: Proyectos[];
  usuario!: any;
  loadingPage: boolean;
  proyectlist: Array<[]>;
  PERIODO_REQ: boolean;

  reportCCD = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    PROYECTOS: new FormControl('', Validators.required),
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

    this.reportCCD.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.reportCCD.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.reportCCD.controls['Role'].setValue(this.usuario.role);
    this.reportCCD.statusChanges.subscribe(result => {
      if (this.reportCCD.controls['PERIODO'].value != null && this.reportCCD.controls['PERIODO'].value != '') {
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
    this.reportCCD.controls['PERIODO'].setValue([])
    this.master.apiPostPeriodReportCCD(this.reportCCD).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reportCCD.controls['urlDownload'].setValue(result.downloadCCD);
          console.log(this.reportCCD)

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
    this.master.apiGetListProyectos(this.reportCCD).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.proyectos.push({ nameProyect: x.nomproyecto , codeProyect: x.idproyecto });
          })
          this.reportCCD.controls['PROYECTOS'].setValue(this.proyectos)

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
  DownloadCCD() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte de CCD');
    } else {
      this.proyectlist = [];
      this.reportCCD.controls['PROYECTOS'].value.forEach((x:any)  => this.proyectlist.push(x.codeProyect));
      this.master.download(this.reportCCD.controls['urlDownload'].value + '&PERIODO=' + this.reportCCD.controls['PERIODO'].value.date + '&IdCia=' + this.reportCCD.controls['IdCia'].value+'&listProyect='+this.proyectlist.map(elemento => `'${elemento}'`).join(',')).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'CCD ' + this.reportCCD.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }

}