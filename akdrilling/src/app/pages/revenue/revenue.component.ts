import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from './../../pages/notifications/notifications.component';
import { MaestrosService } from '../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Table } from "primeng/table";
import { AuthService } from '../../services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router } from '@angular/router';

interface Periodos {
    periodo: string,
    date: string
}

interface OptionRevenue {
    Code: string,
    name: string
}

@Component({
    selector: "app-revenue",
    templateUrl: "revenue.component.html",
    styleUrls: ["revenue.component.scss"],
    providers: [NotificationsComponent, ConfirmationService]
})
export class RevenueComponent implements OnInit {
    @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;
    msgs: Message[] = [];
    periodos!: Periodos[];
    loadingPage: boolean;
    PERIODO_REQ: boolean;
    files: any[] = [];
    usuario!: any;

    camposBd: any;
    multiSortMetaBD: any;
    loading!: boolean;
    datasourceRev: any;
    urlDounload: string;
    datasourceRevenues: any;
    RevenueCampos: any;
    multiSortRevS: any;
    CargaRevenue: boolean;
    items!: MenuItem[];
    optionsRevenue!: OptionRevenue[];

    @ViewChild('revs') revs: any;
    loadingRevenues!: boolean;
    revenue = new FormGroup({
        PERIODO: new FormControl('', Validators.required),
        IdCia: new FormControl('', Validators.required),
        NomSede: new FormControl('', Validators.required),
        file: new FormControl(Blob, Validators.required),
        Role: new FormControl('', Validators.required),
        DatosRevenue: new FormArray([]),
        idRevenue: new FormControl('', Validators.required),
        Option: new FormControl('', Validators.required),

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
        this.optionsRevenue = [];
        this.PERIODO_REQ = false;
        this.camposBd = [];
        this.multiSortMetaBD = [];
        this.datasourceRev = [];
        this.urlDounload = '';
        this.RevenueCampos = [];
        this.multiSortRevS = [];
        this.CargaRevenue = false;
    }
    ngOnInit() {

        this.optionsRevenue.push({
            Code: '01',
            name: 'Ver ingreso'
        }, {
            Code: '02',
            name: 'Crear ingreso'
        })
        this.usuario = this.authService.GetuserInfo();
        if (this.usuario.role == 'AKDABOP' || this.usuario.role == 'AKDADM') {
            this.CargaRevenue = true;
        }

        this.revenue.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
        this.revenue.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
        this.revenue.controls['Role'].setValue(this.usuario.role);
        this.revenue.statusChanges.subscribe(result => {
            if (this.revenue.controls['PERIODO'].value != null && this.revenue.controls['PERIODO'].value != '') {
                this.PERIODO_REQ = true;
            } else {
                this.PERIODO_REQ = false;

            }

        })
        /*Cargo ingresos si hay creados*/
        this.master.getGetRevenues(this.revenue).subscribe({
            next: (result: any) => {

                if (result.status == "ok") {
                    if (result.datos.length) {
                        this.datasourceRevenues = result.datos;
                        for (let campo in this.datasourceRevenues[0]) {
                            if (campo != 'rol') {
                                this.RevenueCampos.push({ field: campo, header: campo });
                            }

                            if (campo == 'idRevenue') {
                                this.multiSortRevS.push({ field: 'idRevenue', order: -1 });
                            }

                        }

                        this.loadingRevenues = true;
                    }
                } else if (result.status == 'warning') {
                    this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
                } else {
                    this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

                }

                this.loadingPage = false;
            },
            error: (result: any) => {
                this.notify.showNotification('top', 'right', 4, 'Error al obtener los ingresos');
                this.loadingPage = false;
            },
            complete: () => {

            }

        })
        if (this.usuario.role == "AKDABRRHH" || this.usuario.role == "AKDABOP" || this.usuario.role == "AKDABDF" || this.usuario.role == "AKDADM") {
            this.master.apiPostPeriodRevenue(this.revenue).subscribe({
                next: (result: any) => {

                    if (result.status == "ok") {
                        result.datos.forEach((x: any) => {
                            this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
                        })
                    } else if (result.status == "warning") {
                        this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
                    } else {
                        this.notify.showNotification('top', 'right', 4, result.datos[0].detail);

                    }

                },
                error: (result) => {

                    this.notify.showNotification('top', 'right', 4, 'Error al obtener los periodos');
                    this.loadingPage = false;
                },
                complete: () => {

                }
            })
        }



    }

    get revenues() { return this.revenue.controls; }

    get DatosRevenue(): FormArray {
        return this.revenue.get("DatosRevenue") as FormArray;
    }

    get tControls() { return this.DatosRevenue.controls as FormGroup[]; }

    acceptCreateRevenue() {
        this.master.apiPostCreaRevenue(this.revenue).subscribe({
            next: (result: any) => {
                if (result.status == "ok") {
                    this.notify.showNotification('top', 'right', 1, 'Revenue Creado y actualizado!');
                    this.revenue.controls['idRevenue'].setValue(result.idRevenue);
                    this.loadingPage = true;
                    this.router.navigate(['/' + this.usuario.role + '/revenue/view'], { queryParams: { idRevenue: result.idRevenue, Option: '01', rol: result.rol } })
                } else if (result.status == "warning") {
                    this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
                } else {
                    if (result.hasOwnProperty("urlResutlado")) {
                        this.master.download(result.urlResutlado).subscribe(blob => {
                            const a = document.createElement('a')
                            const objectUrl = URL.createObjectURL(blob)
                            a.href = objectUrl
                            a.download = 'ErrorIngreso' + this.revenue.controls['PERIODO'].value['periodo'] + '.xlsx';
                            a.click();
                            URL.revokeObjectURL(objectUrl);
                        })
                        this.notify.showNotification('top', 'right', 4, 'Debe revisar los errores encontrados');

                    } else {
                        this.notify.showNotification('top', 'right', 4, result.datos[0].detail);
                    }

                }
                this.loadingPage = false;
            },
            error: (result) => {

                this.notify.showNotification('top', 'right', 4, 'Error al crear o actualizar el revenue de ' + this.revenue.controls['PERIODO'].value.periodo + ', verifique que el archivo se encuentra cerrado');
                this.deleteFile(0);
                this.loadingPage = false;

            },
            complete: () => {

            }
        })
    }

    cargaRevenue() {

        if (!this.PERIODO_REQ) {
            this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un revenue');
        }
        if (this.files.length == 0) {
            this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para crear un ingreso');
        }

        if (this.usuario.role == 'AKDADM') {
            this.revenue.controls['file'].setValue(this.files[0]);
            if (this.PERIODO_REQ && this.files.length > 0 ) {
                this.confirmationService.confirm({
                    message: 'Se cargara el ingreso con el archivo ' + this.files[0].name,
                    header: 'Crear revenue ',
                    icon: 'pi pi-info-circle',
                    accept: () => {
                        this.loadingPage = true;
                        this.acceptCreateRevenue();
                    },
                    reject: () => {
                        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
                    },
                    key: "positionDialog"
                });
            }
        } else {
            this.revenue.controls['file'].setValue(this.files[0]);
            if (this.PERIODO_REQ && this.files.length > 0) {
                this.confirmationService.confirm({
                    message: 'Se cargara el ingreso con el archivo ' + this.files[0].name,
                    header: 'Crear ingreso ',
                    icon: 'pi pi-info-circle',
                    accept: () => {
                        this.loadingPage = true;
                        this.acceptCreateRevenue();
                    },
                    reject: () => {
                        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
                    },
                    key: "positionDialog"
                });
            }
        }
    }
    startRevenue() {
        this.revenue.controls['Option'].setValue({
            Code: '02',
            name: 'Crear Revenue'
        });
    }
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
                if (this.files.length == 0) {
                    item.progress = 0;
                    this.files.push(item);
                } else {
                    this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un ingreso');
                }

            } else {
                this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
            }

        }
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(0);
    }


    setIdBdg(event: any) {
        this.revenue.controls['idRevenue'].setValue(event.value.date);
    }
    onFileDropped($event: any) {
        this.prepareFilesList($event);
    }
    fileBrowseHandler(files: any) {
        this.prepareFilesList(files.target.files);
    }
    deleteFile(index: number) {
        this.files.splice(index, 1);
    }
    uploadFilesSimulator(index: number) {

    }

    formatBytes(bytes: any, decimals = 2) {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    applyFilterGlobalRevS($event: any, stringVal: any) {
        this.revs.filterGlobal($event.target.value, 'contains');
    }
    onRowDblClick(event: Event, datos: any) {
        this.router.navigate(['/' + this.usuario.role + '/revenue/view'], { queryParams: { idRevenue: datos.idRevenue, Option: '01', rol: datos.rol } })
    }

    clear(table: Table) {
        table.clear();
    }

}
