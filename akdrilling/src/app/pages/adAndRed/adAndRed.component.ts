import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../notifications/notifications.component';

import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MaestrosService } from "src/app/services/maestro.service";
import { AuthService } from "src/app/services/auth.services";
import { ActivatedRoute, Router } from "@angular/router";


interface OptionAdRed {
  Code: string,
  name: string
}

@Component({
  selector: "app-adAndRed",
  templateUrl: "adAndRed.component.html",
  styleUrls: ["adAndRed.component.scss"],
  providers: [NotificationsComponent, ConfirmationService]
})
export class AdAndRedComponent implements OnInit {

  loadingPage: boolean;
  msgs: Message[] = [];
  files: any[] = [];
  usuario!: any;
  optionsAdRed!: OptionAdRed[];
  CargaAdRed: boolean;
  PERIODO_REQ: boolean;
  datasourceAdRedS: any;
  AdRedsCampos: any;
  multiSortAdRedS: any;
  loading!: boolean;
  loadingAdReds!: boolean;
  @ViewChild('AdRed') mts: any;
  AdRed = new FormGroup({
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    file: new FormControl(Blob, Validators.required),
    DatosAdRed: new FormArray([]),
    Option: new FormControl('', Validators.required),
    idAdRed: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
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
    this.loadingPage = false;
    this.CargaAdRed = false;
    this.optionsAdRed = [];
    this.PERIODO_REQ = true;
    this.AdRedsCampos = [];
    this.multiSortAdRedS = [];
  }
  ngOnInit() {
    this.optionsAdRed.push({
      Code: '01',
      name: 'Ver Meet'
    }, {
      Code: '02',
      name: 'Crear Meet'
    })
    this.usuario = this.authService.GetuserInfo();
    if (this.usuario.role == 'AKDAMT' || this.usuario.role == 'AKDAAMT' || this.usuario.role == 'AKDADM') {
      this.CargaAdRed = true;
    }

    this.AdRed.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.AdRed.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.AdRed.controls['Role'].setValue(this.usuario.role);
    this.AdRed.statusChanges.subscribe(result => {
      if (this.AdRed.controls['PERIODO'].value != null && this.AdRed.controls['PERIODO'].value != '') {
        this.PERIODO_REQ = true;
      } else {
        this.PERIODO_REQ = false;

      }

    })

    this.master.apiGetAdAndRedAll(this.AdRed).subscribe({
      next: (result: any) => {
        if (result.status == "ok") {
          this.datasourceAdRedS = result.datos;
          for (let campo in this.datasourceAdRedS[0]) {
            this.AdRedsCampos.push({ field: campo, header: campo });
            if (campo == 'idMeet') {
              this.multiSortAdRedS.push({ field: 'idMeet', order: -1 });
            }
          }

          this.loadingAdReds = true;
        } else if (result.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

        }

        this.loadingPage = false;
      },
      error: (result: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los Meet');
        this.loadingPage = false;
      },
      complete: () => {

      },
    })
  }

  get DatosAdRed(): FormArray {
    return this.AdRed.get("DatosAdRed") as FormArray;
  }

  applyFilterGlobalAdRedS($event: any, stringVal: any) {
    this.mts.filterGlobal($event.target.value, 'contains');
  }
  setIdMts(event: any) {
    this.AdRed.controls['idAdRed'].setValue(event.value.date);
  }

  onRowDblClick(event: Event, datos: any) {
    this.router.navigate(['/' + this.usuario.role + '/floatInAction/adAndRed/view'], { queryParams: { idMeet: datos.idMeet, Option: '01' } })
  }

  startCargaAdRed() {
    this.AdRed.controls['Option'].setValue({
      Code: '02',
      name: 'Crear AdRed'
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
