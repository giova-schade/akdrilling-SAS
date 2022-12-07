import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MaestrosService } from '../../../services/maestro.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MenuItem, Message, MessageService, SortEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { BlockLike, collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { AuthService } from '../../../services/auth.services';
import { arrow } from "@popperjs/core";
import { ActivatedRoute, Router } from '@angular/router';
import { param } from "jquery";
import { positionElements } from "@ng-bootstrap/ng-bootstrap/util/positioning";
interface Periodos {
  periodo: string,
  date: string
}

interface OptionMeet {
  Code: string,
  name: string
}

@Component({
  selector: "app-viewAdAndRed",
  templateUrl: "ViewAdAndRed.component.html",
  styleUrls: ["ViewAdAndRed.component.scss"],
  providers: [NotificationsComponent, ConfirmationService, MessageService]
})
export class ViewAdAndRedComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef | any;


  datosDetailAdRed: any;
  filesAD: any[] = [];
  filesRe: any[] = [];
  loadingPage: boolean;
  usuario!: any;
  msgs: Message[] = [];
  periodos!: Periodos[];
  optionsMeet!: OptionMeet[];
  PERIODO_REQ: boolean;
  testForm!: any;
  camposAd: any;
  camposRe: any;
  multiSortMetaAd: any;
  multiSortMetaRe: any;
  loading!: boolean;
  datasourceAd: any;
  datasourceRe: any;
  urlDounloadAd: string;
  urlDounloadRed: string;
  datasourceAds: any;
  multiSortads: any;
  items!: MenuItem[];
  activeIndex: number = 0;
  @ViewChild('Ad') bds: any;
  @ViewChild('Re') bdR: any;
  loadingmts!: boolean;
  AdRed = new FormGroup({
    idAdRed: new FormControl('', Validators.required),
    PERIODO: new FormControl('', Validators.required),
    IdCia: new FormControl('', Validators.required),
    NomSede: new FormControl('', Validators.required),
    fileAD: new FormControl(Blob, Validators.required),
    fileRe: new FormControl(Blob, Validators.required),
    DatosAd: new FormArray([]),
    DatosRe: new FormArray([]),
    Option: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required),
    weekInProgress: new FormControl('', Validators.required),

  })

  mainForm = new FormGroup({});


  constructor(
    private master: MaestrosService,
    private notify: NotificationsComponent,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loadingPage = true;
    this.loading = true;
    this.periodos = [];
    this.optionsMeet = [];
    this.PERIODO_REQ = false;
    this.camposAd = [];
    this.camposRe = [];
    this.multiSortMetaAd = [];
    this.datasourceAd = [];
    this.datasourceRe = [];
    this.urlDounloadAd = '';
    this.urlDounloadRed = '';
    this.multiSortMetaRe = [];
  }
  ngOnInit() {
    /*cargo flujo*/
    this.items = [{
      label: 'Creado',
      id: '0',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'En aprobación',
      id: '1',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Meet',
      id: '2',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Adición / Reducción',
      id: '3',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Cerrado',
      id: '4',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    }
    ];



    this.usuario = this.authService.GetuserInfo();
    this.AdRed.controls['IdCia'].setValue(this.usuario.ciaSelected.IdCia);
    this.AdRed.controls['NomSede'].setValue(this.usuario.ciaSelected.NomSede);
    this.AdRed.controls['Role'].setValue(this.usuario.role);
    this.route.queryParams
      .subscribe((params: any) => {
        this.AdRed.controls['idAdRed'].setValue(params.idMeet);
        this.AdRed.controls['Option'].setValue({
          Code: params.Option,
          name: 'Ver AdRed'
        });


        /*obtengo los datos del AdRed a partir del id del AdRed*/
        this.master.apiPostAdReByID(this.AdRed).subscribe({
          next: (response: any) => {
            if (response.status == "ok") {
              this.AdRed.controls['PERIODO'].setValue({
                periodo: response.periodo,
                date: response.date
              });

              this.items.forEach((x: any, y) => { if (x.label == response.estado) { this.activeIndex = parseInt(x.id) } })
              this.AdRed.controls['estado'].setValue(response.estado);
              this.AdRed.controls['date'].setValue(response.date);
              this.AdRed.controls['weekInProgress'].setValue(response.weekInProgress);



              this.datasourceAd = response.datosAd;
              this.datasourceRe = response.datosRe;
              this.clearFormArray(this.DatosAd);
              this.clearFormArray(this.DatosRe);
              this.multiSortMetaAd = [];
              this.multiSortMetaRe = [];
              this.loading = false;
              if (response.status == "ok") {
                if (response.datosAd.length > 0) {
                  for (let i in response.datosAd[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }

                if (response.datosRe.length > 0) {
                  for (let i in response.datosRe[0]) {
                    this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                  }
                }
                this.camposAd = [
                  { field: 'idbgdt5', header: 'idbgdt5' },
                  { field: 'bdgt1', header: 'bdgt1' },
                  { field: 'bdgt2', header: 'bdgt2' },
                  { field: 'bdgt3', header: 'bdgt3' },
                  { field: 'bdgt4', header: 'bdgt4' },
                  { field: 'bdgt5', header: 'bdgt5' }
                ]
                this.camposRe = [
                  { field: 'idbgdt5', header: 'idbgdt5' },
                  { field: 'bdgt1', header: 'bdgt1' },
                  { field: 'bdgt2', header: 'bdgt2' },
                  { field: 'bdgt3', header: 'bdgt3' },
                  { field: 'bdgt4', header: 'bdgt4' },
                  { field: 'bdgt5', header: 'bdgt5' }
                ]
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Week') == 0) {
                    this.camposAd.push({ field: i, header: i })
                  }
                  // this.camposMt.push({ field: i, header: i })
                  if (i == 'bdgt1') {
                    this.multiSortMetaAd.push({ field: i, order: -1 });
                    this.multiSortMetaRe.push({ field: i, order: -1 });
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Remaning') == 0) {
                    this.camposAd.push({ field: i, header: i })
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('description') == 0) {
                    this.camposAd.push({ field: i, header: i })
                  }
                }
                /*Re */
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Week') == 0) {
                    this.camposRe.push({ field: i, header: i })
                  }
                  // this.camposMt.push({ field: i, header: i })
                  if (i == 'bdgt1') {
                    this.multiSortMetaAd.push({ field: i, order: -1 });
                    this.multiSortMetaRe.push({ field: i, order: -1 });
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('Remaning') == 0) {
                    this.camposRe.push({ field: i, header: i })
                  }
                }
                for (let i in this.mainForm.controls) {
                  if (i.indexOf('description') == 0) {
                    this.camposRe.push({ field: i, header: i })
                  }
                }
                /* */
                if (response.downloadAd.length > 0) {
                  this.urlDounloadAd = response.downloadAd;
                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo de adición para descargar');

                }

                if (response.downloadRed.length > 0) {
                  this.urlDounloadRed = response.downloadRed;
                } else {
                  this.notify.showNotification('top', 'right', 3, 'No hay archivo de reducción para descargar');

                }
                this.loadingPage = false;

                response.datosAd.forEach((x: any, y: any) => {

                  this.DatosAd.push(new FormGroup({}))
                })
                response.datosRe.forEach((x: any, y: any) => {

                  this.DatosRe.push(new FormGroup({}))

                })

              } else {
                this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
                this.loadingPage = false;

              }
              this.loadingPage = false;
            } else if (response.status == 'warning') {
              this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

            }

          },
          error: (result: any) => {

            this.notify.showNotification('top', 'right', 4, 'Error al obtener el AdRed ' + this.AdRed.controls['idAdRed'].value);
            this.loadingPage = false;

          },
          complete: () => {

          }
        })
      })



  }


  get mts() { return this.AdRed.controls; }
  //get bd() { return this.bdts.DatosAdRed as FormArray; }

  get DatosAd(): FormArray {
    return this.AdRed.get("DatosRe") as FormArray;
  }

  get tControls() { return this.DatosAd.controls as FormGroup[]; }

  get DatosRe(): FormArray {
    return this.AdRed.get("DatosRe") as FormArray;
  }

  get tControlsRe() { return this.DatosRe.controls as FormGroup[]; }


  clickN(event: any) {
    console.log(event);
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  downloadAdRed(typeload: string) {
    var urlDescarga = '';
    if (typeload == 'ad') {
      urlDescarga = this.urlDounloadAd;
    } else {
      urlDescarga = this.urlDounloadRed;
    }
    this.master.downloadADRE(urlDescarga, typeload).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      var proc: string = '';
      a.href = objectUrl
      if (typeload == 'ad') {
        proc = 'adición';
      } else if (typeload = 're') {
        proc = "reducción";
      }
      a.download = proc + this.AdRed.controls['PERIODO'].value['periodo'] + '.xlsx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    })

  }

  onRowSelect(event: Event) {
    console.log(event)
  }
  SendToApprove() {
    this.master.apiPostApproveAdRe(this.AdRed).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'AdRed ' + response.idAdRed + ' enviado a aprobar!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/AdRed/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }
        this.loadingPage = false;


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al enviar a aprobar el AdRed');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowAceptar() {
    this.master.apiPostApproveAdRe(this.AdRed).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'AdRed ' + response.idAdRed + ' aprobado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/adAndRed/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al aceptar el AdRed');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }

  rechazar() {
    this.master.apiPostRejectAdRe(this.AdRed).subscribe({
      next: (response: any) => {
        if (response.status == "ok") {
          this.notify.showNotification('top', 'right', 1, 'AdRed ' + response.idAdRed + ' rechazado!');
          this.router.navigate(['/' + this.usuario.role + '/floatInAction/adAndRed/'], { queryParams: {} })
        } else if (response.status == 'warning') {
          this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
        } else {
          this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

        }


      },
      error: (response: any) => {
        this.notify.showNotification('top', 'right', 4, 'Error al rechazar el AdRed');
        this.loadingPage = false;
      },
      complete: () => { }
    })
  }
  flowRechazar() {
    this.confirmationService.confirm({
      message: 'Seguro de rechazar el AdRed?',
      header: 'Flujo ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loadingPage = true;
        this.rechazar();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      key: "positionDialog"
    });
  }
  loadAdRed(Type: string) {

    if (Type == 'ad') {
      this.master.apiPostLoadAdicion(this.AdRed).subscribe({
        next: (response: any) => {
          if (response.status == "ok") {
            this.master.apiPostAdReByID(this.AdRed).subscribe({
              next: (response: any) => {
                if (response.status == "ok") {
                  this.AdRed.controls['PERIODO'].setValue({
                    periodo: response.periodo,
                    date: response.date
                  });

                  this.AdRed.controls['estado'].setValue(response.estado);
                  this.AdRed.controls['date'].setValue(response.date);


                  this.multiSortMetaAd = [];
                  this.multiSortMetaRe = [];
                  this.datasourceAd = response.datosAd;
                  this.datasourceRe = response.datosRe;

                  this.loading = false;
                  if (response.status == "ok") {
                    if (response.datosAd.length > 0) {
                      for (let i in response.datosAd[0]) {
                        this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                      }
                    }

                    if (response.datosRe.length > 0) {
                      for (let i in response.datosRe[0]) {
                        this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                      }
                    }


                    /*
                    for (let i in this.mainForm.controls) {
                      this.camposAd.push({ field: i, header: i })
                      this.camposRe.push({ field: i, header: i })
                      if (i == 'idAdRed') {
                        this.multiSortMetaAd.push({ field: i, order: -1 });
                        this.multiSortMetaRe.push({ field: i, order: -1 });
                      }
                    }*/

                    this.deleteFile(0, Type)
                    if (response.downloadAdRed.length > 0) {
                      this.urlDounloadAd = response.downloadAdRed;
                    } else {
                      this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                    }
                    if (response.downloadAdRed.length > 0) {
                      this.urlDounloadRed = response.downloadAdRed;
                    } else {
                      this.notify.showNotification('top', 'right', 3, 'No hay archivo para descargar');

                    }
                    this.loadingPage = false;

                    response.datos.forEach((x: any, y: any) => {

                      this.DatosAd.push(new FormGroup({}))


                      /*
                      for (let i in x) {
                        this.tControls[y].addControl([i].toString(), new FormControl('', Validators.required));
                        this.tControls[y].controls[i].setValue(x[i]);
      
                      }*/

                    })

                  } else {
                    this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
                    this.loadingPage = false;

                  }
                  this.loadingPage = false;
                } else if (response.status == 'warning') {
                  this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
                } else {
                  this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

                }

              },
              error: (result: any) => {

                this.notify.showNotification('top', 'right', 4, 'Error al obtener el AdRed ' + this.AdRed.controls['idMAdRed'].value);
                this.loadingPage = false;

              },
              complete: () => {

              }
            })
            if (Type == 'ad') {
              this.notify.showNotification('top', 'right', 1, 'Adición cargado correctamente!');

            } else if (Type == 're') {
              this.notify.showNotification('top', 'right', 1, 'Reducción cargado correctamente!');

            }
            this.loadingPage = false;
          } else if (response.status == 'warning') {
            this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
          } else {
            this.loadingPage = false;

            if (response.hasOwnProperty("urlResutlado")) {
              this.master.download(response.urlResutlado).subscribe(blob => {
                const a = document.createElement('a')
                const objectUrl = URL.createObjectURL(blob)
                a.href = objectUrl
                a.download = 'ErrorAdRed' + this.AdRed.controls['PERIODO'].value['periodo'] + '.xlsx';
                a.click();
                URL.revokeObjectURL(objectUrl);
              })
              this.notify.showNotification('top', 'right', 4, 'Debe revisar los errores encontrados');

            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
            }


          }


        },
        error: (response: any) => {
          this.notify.showNotification('top', 'right', 4, 'Error al cargar el documento'+ ', verifique que el archivo se encuentra cerrado');
          this.deleteFile(0,'ad');
          this.loadingPage = false;
        },
        complete: () => { }
      })
    } else {
      this.master.apiPostLoadReduccion(this.AdRed).subscribe({
        next: (response: any) => {
          if (response.status == "ok") {
            this.master.apiPostAdReByID(this.AdRed).subscribe({
              next: (response: any) => {
                if (response.status == "ok") {
                  this.AdRed.controls['PERIODO'].setValue({
                    periodo: response.periodo,
                    date: response.date
                  });

                  this.AdRed.controls['estado'].setValue(response.estado);
                  this.AdRed.controls['date'].setValue(response.date);


                  this.multiSortMetaAd = [];
                  this.multiSortMetaRe = [];
                  this.datasourceAd = response.datosAd;
                  this.datasourceRe = response.datosRe;

                  this.loading = false;
                  if (response.status == "ok") {
                    if (response.datosAd.length > 0) {
                      for (let i in response.datosAd[0]) {
                        this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                      }
                    }

                    if (response.datosRe.length > 0) {
                      for (let i in response.datosRe[0]) {
                        this.mainForm.addControl([i].toString(), new FormControl('', Validators.required));
                      }
                    }



                    /*for (let i in this.mainForm.controls) {
                      this.camposAd.push({ field: i, header: i })
                      this.camposRe.push({ field: i, header: i })
                      if (i == 'idAdRed') {
                        this.multiSortMetaAd.push({ field: i, order: -1 });
                        this.multiSortMetaRe.push({ field: i, order: -1 });
                      }
                    }*/

                    this.deleteFile(0, Type)
                    if (response.downloadRed.length > 0) {
                      this.urlDounloadRed = response.downloadRed;
                    } else {
                      this.notify.showNotification('top', 'right', 3, 'No hay archivo de reducción para descargar');

                    }
                    if (response.downloadAd.length > 0) {
                      this.urlDounloadAd = response.downloadAd;
                    } else {
                      this.notify.showNotification('top', 'right', 3, 'No hay archivo de adición para descargar');

                    }                    
                    this.loadingPage = false;

                    response.datos.forEach((x: any, y: any) => {

                      this.DatosAd.push(new FormGroup({}))


                      /*
                      for (let i in x) {
                        this.tControls[y].addControl([i].toString(), new FormControl('', Validators.required));
                        this.tControls[y].controls[i].setValue(x[i]);
      
                      }*/

                    })

                  } else {
                    this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
                    this.loadingPage = false;

                  }
                  this.loadingPage = false;
                } else if (response.status == 'warning') {
                  this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
                } else {
                  this.notify.showNotification('top', 'right', 4, response.datos[0].detail);

                }

              },
              error: (result: any) => {

                this.notify.showNotification('top', 'right', 4, 'Error al obtener el AdRed ' + this.AdRed.controls['idMAdRed'].value);
                this.loadingPage = false;

              },
              complete: () => {

              }
            })
            if (Type == 'ad') {
              this.notify.showNotification('top', 'right', 1, 'Adición cargado correctamente!');

            } else if (Type == 're') {
              this.notify.showNotification('top', 'right', 1, 'Reducción cargado correctamente!');

            }
            this.loadingPage = false;
          } else if (response.status == 'warning') {
            this.notify.showNotification('top', 'right', 3, response.datos[0].detail);
          } else {
            this.loadingPage = false;

            if (response.hasOwnProperty("urlResutlado")) {
              this.master.download(response.urlResutlado).subscribe(blob => {
                const a = document.createElement('a')
                const objectUrl = URL.createObjectURL(blob)
                a.href = objectUrl
                a.download = 'ErrorAdRed' + this.AdRed.controls['PERIODO'].value['periodo'] + '.xlsx';
                a.click();
                URL.revokeObjectURL(objectUrl);
              })
              this.notify.showNotification('top', 'right', 4, 'Debe revisar los errores encontrados');

            } else {
              this.notify.showNotification('top', 'right', 4, response.datos[0].detail);
            }


          }


        },
        error: (response: any) => {
          this.notify.showNotification('top', 'right', 4, 'Error al cargar el documento'+ ', verifique que el archivo se encuentra cerrado');
          this.deleteFile(0,'re');

          this.loadingPage = false;
        },
        complete: () => { }
      })
    }

  }

  ProcesarRe(typefile: string) {
    if (this.filesRe.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar la reducción');
    }
    if (this.filesRe.length > 0) {
      this.AdRed.controls['fileAD'].setValue(this.filesRe[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.filesRe[0].name,
        header: 'Cargar reducción ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.loadAdRed(typefile);
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "reduccion"
      });
    }
  }
  ProcesarAd(typefile: string) {
    if (this.filesAD.length == 0) {
      this.notify.showNotification('top', 'right', 3, 'Debe seleccionar un archivo para cargar la adición');
    }
    if (this.filesAD.length > 0) {
      this.AdRed.controls['fileAD'].setValue(this.filesAD[0]);
      this.confirmationService.confirm({
        message: 'Se cargara el archivo ' + this.filesAD[0].name,
        header: 'Cargar adición ',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.loadingPage = true;
          this.loadAdRed(typefile);
        },
        reject: () => {
          this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        },
        key: "adicion"
      });
    }

  }
  snakeChart(data: any, chartContainer: any) {
  }

  prepareFilesList(files: Array<any>, typefile: string) {
    if (typefile == 'ad') {
      for (const item of files) {
        if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
          if (this.filesAD.length == 0) {
            item.progress = 0;
            this.filesAD.push(item);
          } else {
            this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un AdRed');
          }

        } else {
          this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
        }

      }
      this.fileDropEl.nativeElement.value = "";
      this.uploadFilesSimulator(0, typefile);
    } else if (typefile == 're') {
      for (const item of files) {
        if (item.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || item.type == ".csv" || item.type == "application/vnd.ms-excel") {
          if (this.filesRe.length == 0) {
            item.progress = 0;
            this.filesRe.push(item);
          } else {
            this.notify.showNotification('top', 'right', 3, 'Solo puede subir un archivo para crear un AdRed');
          }

        } else {
          this.notify.showNotification('top', 'right', 3, 'El archivo debe ser de tipo excel');
        }

      }
      this.fileDropEl.nativeElement.value = "";
      this.uploadFilesSimulator(0, typefile);
    }

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

  uploadFilesSimulator(index: number, typefile: string) {

    if (typefile == 'ad') {
      setTimeout(() => {
        if (index === this.filesAD.length) {
          return;
        } else {
          const progressInterval = setInterval(() => {
            if (this.filesAD[index].progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1, typefile);
            } else {
              this.filesAD[index].progress += 5;
            }
          }, 200);
        }
      }, 1000);
    } else if (typefile == 're') {
      setTimeout(() => {
        if (index === this.filesRe.length) {
          return;
        } else {
          const progressInterval = setInterval(() => {
            if (this.filesRe[index].progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1, typefile);
            } else {
              this.filesRe[index].progress += 5;
            }
          }, 200);
        }
      }, 1000);
    }

  }
  onFileDropped($event: any, typefile: string) {
    this.prepareFilesList($event, typefile);
  }
  fileBrowseHandler(files: any, typefile: string) {
    this.prepareFilesList(files.target.files, typefile);
  }
  deleteFile(index: number, typefile: string) {
    if (typefile == 'ad') {
      this.filesAD.splice(index, 1);
    } else if (typefile == 're') {
      this.filesRe.splice(index, 1);
    }

  }
  applyFilterGlobalBD($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  applyFilterGlobalBDS($event: any, stringVal: any) {
    this.bds.filterGlobal($event.target.value, 'contains');
  }

  filter(aa: any) {
    console.log(aa)
  }
  clear(table: Table) {
    table.clear();
  }

}
