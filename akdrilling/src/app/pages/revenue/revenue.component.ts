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
    revenue = new FormGroup({
        PERIODO: new FormControl('', Validators.required),
        IdCia: new FormControl('', Validators.required),
        NomSede: new FormControl('', Validators.required),
        file: new FormControl(Blob, Validators.required),
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
        this.periodos = [];
        this.loadingPage = true;
        this.PERIODO_REQ = false;
    }
    ngOnInit() {
        this.periodos = [];
        this.revenue.controls['PERIODO'].setValue([]);
        this.usuario = this.authService.GetuserInfo();
        this.master.apiPostPeriodRevenue(this.revenue).subscribe({
            next: (result: any) => {
                if (result.status == "ok") {
                    result.datos.forEach((x: any) => {
                        this.periodos.push({ periodo: x.periodo + ' ' + x.date.split('/')[2], date: x.date });
                    })
                    console.log(this.revenue)

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

            }
        })

        this.revenue.statusChanges.subscribe(result => {
            if (this.revenue.controls['PERIODO'].value != null && this.revenue.controls['PERIODO'].value != '') {
              this.PERIODO_REQ = true;
            } else {
              this.PERIODO_REQ = false;
      
            }
      
          })
 
        this.loadingPage = false;


    }
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
                if (this.files.length == 0) {
                    item.progress = 0;
                    this.files.push(item);
                } else {
                    this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para cargar los ingresos.');
                }

            } else {
                this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
            }

        }
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(0);
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
    acceptCreateRevenue() {
        this.master.apiPostLoadRevenue(this.revenue).subscribe({
            next: (result: any) => {
                if (result.status == "ok") {
                    this.notify.showNotification('top', 'right', 1, 'Ingreso subido correctamente!');
                    this.loadingPage = true;
                } else if (result.status == "warning") {
                    this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
                } else {
                    if (result.hasOwnProperty("urlResutlado")) {
                        this.master.download(result.urlResutlado).subscribe(blob => {
                            const a = document.createElement('a')
                            const objectUrl = URL.createObjectURL(blob)
                            a.href = objectUrl
                            a.download = 'ErrorRevenue' + this.revenue.controls['PERIODO'].value['periodo'] + '.xlsx';
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

                this.notify.showNotification('top', 'right', 4, 'Error al subir los ingresos para el periodo ' + this.revenue.controls['PERIODO'].value.periodo + ', verifique que el archivo se encuentra cerrado');
                this.deleteFile(0);
                this.loadingPage = false;

            },
            complete: () => {

            }
        })
    }
    SubirRevenue() {
        if (!this.PERIODO_REQ) {
            this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un periodo crear un budget');
        }
        if (this.files.length == 0) {
            this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para crear un budget');
        }

        if (this.usuario.role == 'AKDADM') {
            this.revenue.controls['file'].setValue(this.files[0]);
            if (this.PERIODO_REQ && this.files.length) {
                this.confirmationService.confirm({
                    message: 'Se subira el ingreso con el archivo ' + this.files[0].name,
                    header: 'Subir ingreso ',
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
                    message: 'Se subira el ingreso con el archivo ' + this.files[0].name,
                    header: 'Subir ingreso ',
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


}
