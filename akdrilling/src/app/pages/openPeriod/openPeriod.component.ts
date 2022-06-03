import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';
import { MaestrosService } from '../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { BlockLike } from "typescript";
import { AuthService } from '../../services/auth.services';

interface Periodos {
  periodo: string,
  date: string
}

@Component({
  selector: "app-openPeriod",
  templateUrl: "openPeriod.component.html",
  styleUrls: ["openPeriod.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class OpenPeriodComponent implements OnInit {
  loadingPage: boolean;
  periodos!: Periodos[];
  PERIODO_REQ: boolean;
  usuario!  : any ;
  msgs: Message[] = [];
  openPeriod = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
  })
  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
  ) {
    this.loadingPage = false;
    this.periodos = [];
    this.PERIODO_REQ = false;
  }
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();
    this.openPeriod.controls['IdCia'].setValue(this.usuario.info.sede.IdCia);
    this.openPeriod.controls['NomSede'].setValue(this.usuario.info.sede.NomSede);
    this.openPeriod.statusChanges.subscribe(result => {
      if (this.openPeriod.controls['PERIODO'].value != null) {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })
    this.loadingPage = true;
    this.master.getPeriod().subscribe({
      next: (result) => {
        if (result.status == "ok") {
          result.datos.forEach((x: any) => {
            this.periodos.push({ periodo: x.periodo, date: x.date });
          })
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
        }
        this.loadingPage = false;
      },
      error: (result) => {

        this.notify.showNotification('top', 'right', 4, 'Error al obtener los periodos');
        this.loadingPage = false;
      },
      complete: () => {

      }
    })



  }
  acceptCreatePeriod(periodo : string) {
    this.master.postCreatePeriod(this.openPeriod).subscribe({
      next: (result) => {
        console.log(result)
        if(result.status == "ok"){
          this.notify.showNotification('top', 'right', 1, 'Periodo de '+periodo+' creado');


        }else{
          
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }
        this.loadingPage = false;
      },
      error: (result) => {
        this.notify.showNotification('top', 'right', 4, 'Error al crear el periodo:'+periodo);

        this.loadingPage = false;

      },
      complete: () => {

      }
    })
  }
  CrearPeriodo() {
    if (this.PERIODO_REQ) {

      this.confirmationService.confirm({
        message: 'Se creará el periodo de ' + this.openPeriod.controls['PERIODO'].value.periodo,
        header: 'Crear periodo ',
        icon: 'pi pi-info-circle',      
        rejectLabel: 'Cancelar', 
        acceptLabel: 'Aceptar', 
        accept: () => {
          this.loadingPage = true;
          this.acceptCreatePeriod(this.openPeriod.controls['PERIODO'].value.periodo);
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "positionDialog"
      });

    } else {
      this.notify.showNotification('top', 'right', 4, 'Debe ingresar un periodo antes de crearlo');
    }

  }

}
