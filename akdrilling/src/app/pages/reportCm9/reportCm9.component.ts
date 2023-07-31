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
  selector: "app-reportCm9",
  templateUrl: "reportCm9.component.html",
  styleUrls: ["reportCm9.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class ReportCm9Component implements OnInit {
  periodos!: Periodos[];
  proyectos!: Proyectos[];
  proyectlist: Array<[]>;

  usuario!: any;
  loadingPage: boolean;
  PERIODO_REQ: boolean;

  reportcm = new FormGroup({
    PROYECTOS: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    Role: new FormControl('', Validators.required),
    urlDownload: new FormControl('', Validators.required),
    nameReport: new FormControl('', Validators.required)


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
    this.proyectlist = [];
    
    this.loadingPage = true;
    this.PERIODO_REQ = true;
  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();

    this.reportcm.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.reportcm.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.reportcm.controls['Role'].setValue(this.usuario.role);
    this.reportcm.statusChanges.subscribe(result => {
      if (this.reportcm.controls['PERIODO'].value != null && this.reportcm.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.datosReporteCM();
    this.loadingPage = true;

  }
  datosReporteCM() {
    this.periodos = [];
    this.proyectos = [];

    this.reportcm.controls['PERIODO'].setValue([])
    this.master.apiPostPeriodReportCM9(this.reportcm).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
          })
          this.reportcm.controls['urlDownload'].setValue(result.downloadCM);
          this.reportcm.controls['nameReport'].setValue(result.nameReport);
          console.log(this.reportcm)

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
    this.master.apiGetListProyectos(this.reportcm).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.proyectos.push({ nameProyect: x.nomproyecto , codeProyect: x.idproyecto });
          })
          this.reportcm.controls['PROYECTOS'].setValue(this.proyectos)

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
  DownloadCM() {

    if (!this.PERIODO_REQ) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo para descargar el Reporte ');
    } else {
      this.proyectlist = [];
      this.reportcm.controls['PROYECTOS'].value.forEach((x:any)  => this.proyectlist.push(x.codeProyect));
      this.master.download(this.reportcm.controls['urlDownload'].value + '&PERIODO=' + this.reportcm.controls['PERIODO'].value.date + '&IdCia=' + this.reportcm.controls['IdCia'].value+'&listProyect='+this.proyectlist.join(',')).subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = this.reportcm.controls['nameReport'].value + this.reportcm.controls['PERIODO'].value['periodo'] + '.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
    }


  }
}