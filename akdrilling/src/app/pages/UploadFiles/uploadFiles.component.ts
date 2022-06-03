import { Component, OnInit, ViewEncapsulation, ViewChild  } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import { MaestrosService } from '../../services/maestro.service';
import { NotificationsComponent } from './../../pages/notifications/notifications.component';

import { LazyLoadEvent } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from "primeng/table";

@Component({
  selector: "app-uploadFiles",
  templateUrl: "uploadFiles.component.html",
  styleUrls: ["./uploadFiles.component.scss"],
  providers : [NotificationsComponent]
})
export class UploadFilesComponent implements OnInit {
  
  displayPosition: boolean;
  dialogTitulo: string;
  dialogMensaje: string;
  usurio: any;
  flag: boolean;
  loadingPage:boolean;

  
  datasourceFC:any;
  fcCampos: any;
  totalRecordsFC:number;
  fcview:boolean;

  datasourceTS: any;
  tsCampos:any;
  totalRecordTs:number;
  tsview:boolean;
  
  datasourceA:any;
  taCampos:any;
  totalRecordsA:number;
  aview:boolean;


  datasourceAUX:any;
  aCampos:any;
  totalRecordsAUX:number;
  auxview:boolean;



  datasourceCC:any;
  ccCampos:any;
  totalRecordsCC:number;
  ccview:boolean;


  datasourceM:any;
  mCampos:any;
  totalRecordsM:number;
  mview:boolean;

  datasourceMon: any;
  tmCampos:any;
  totalRecordsMon:number;
  monview:boolean;

  datasourceP:any;
  pCampos:any;
  totalRecordsP:any;
  pview:boolean;
  
  datasourceS:any;
  sCampos:any;
  totalRecordsS:any;
  sview:boolean;

  datasourceU:any;
  unCampos:any;
  totalRecordsU:number;
  unview:boolean;
  multiSortMetaFC : any;
  multiSortMetaS : any ;
  multiSortMetaTS : any ;
  multiSortMetaM : any ;
  multiSortMetaP : any ;
  multiSortMetaA : any ;
  multiSortMetaUN : any ;
  multiSortMetaTM : any ;
  multiSortMetaTA : any ;
  multiSortMetaCC : any ;




  
  
  @ViewChild('dtfc') dtfc: any;
  @ViewChild('dtts') dtts: any;
  @ViewChild('dtp') dtp: any;
  @ViewChild('dtm') dtm: any;
  @ViewChild('dts') dts: any;
  @ViewChild('dta') dta: any;
  @ViewChild('dtun') dtun: any;
  @ViewChild('dttm') dttm: any;
  @ViewChild('dtta') dtta: any;
  @ViewChild('dtcc') dtcc: any;

  


  cols!: any[];

  loading!: boolean;
  
  constructor(private authService: AuthService,
              private notify: NotificationsComponent, 
              private  master: MaestrosService,
              private primengConfig: PrimeNGConfig) {
    this.displayPosition= false;
    this.dialogTitulo='';
    this.dialogMensaje ='';
    this.usurio = {};
    this.flag = false;

    this.datasourceFC=[];
    this.totalRecordsFC=0;
    this.fcCampos = [];

    this.tsCampos=[];
    this.pCampos=[];
    this.mCampos=[];
    this.sCampos=[];
    this.aCampos=[];
    this.unCampos=[];
    this.tmCampos=[];
    this.taCampos=[];
    this.ccCampos=[];
    this.totalRecordTs=0;
    this.totalRecordsA=0;
    this.totalRecordsAUX=0;
    this.totalRecordsCC=0;
    this.totalRecordsM=0;
    this.totalRecordsMon=0;
    this.totalRecordsU=0;
    this.fcview=false;
    this.tsview=false;
    this.aview=false;
    this.auxview=false;
    this.ccview=false;
    this.mview=false;
    this.monview=false;
    this.pview=false;
    this.sview=false;
    this.unview=false;
    this.loadingPage=false;
    this.multiSortMetaFC = [];
    this.multiSortMetaS =[] ;
    this.multiSortMetaTS=[] ;
    this.multiSortMetaM =[] ;
    this.multiSortMetaP =[] ;
    this.multiSortMetaA =[] ;
    this.multiSortMetaUN =[] ;
    this.multiSortMetaTM  =[] ;
    this.multiSortMetaTA  =[] ;
    this.multiSortMetaCC  =[] ;
    
  }

  ngOnInit() {
    this.flag = false;
    this.usurio = this.authService.GetuserInfo();
    
    /*si tiene mas de una sede debe elegir a cual pertenecer*/   

  }
  
  loadFlujoCaja(){
    this.datasourceFC = [];
    this.totalRecordsFC = 0;
    this.loading = true;
    this.loadingPage = true;
    this.multiSortMetaFC=[];
    this.master.getMaestroFlujoCaja().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceFC = result.datos;
          this.totalRecordsFC = result.datos.length;
          this.loading = false;
          this.fcCampos = [];
          if (this.datasourceFC.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                if(x == 'IdCia'){
                  this.multiSortMetaFC.push({field: 'IdCia', order: -1});
                }
                 this.fcCampos.push({field:  x, header: x});
                 
              }
          }
          } 
          this.fcview=true;
          this.loadingPage=false;
        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.fcview=false;
          this.loadingPage=false;


        }

      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de flujo caja  ')
        this.fcview=false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadTipoServicio(){
    this.datasourceTS = [];
    this.totalRecordTs = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaTS=[];

    this.master.getMaestroTipoServicio().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceTS = result.datos;
          this.totalRecordTs = result.datos.length;
          this.loading = false;
          this.tsCampos = [];
          if (this.datasourceTS.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.tsCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaTS.push({field: 'idcia', order: -1});
                }
              }
          }
          } 

          this.tsview=true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.tsview=false;
          this.loadingPage=false;

        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de tipo de servicio  ');
        this.tsview=false;
        this.loadingPage=false;

        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadProyectos(){
    this.datasourceP = [];
    this.totalRecordsP = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaP=[];

    this.master.getMaestroProyecto().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceP = result.datos;
          this.totalRecordsP = result.datos.length;
          this.loading = false;
          this.pCampos = [];
          if (this.datasourceP.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.pCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaP.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.pview = true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.pview = false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de proyectos  ');
        this.pview = false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadMaquinas(){
    this.datasourceM = [];
    this.totalRecordsM = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaM=[];

    this.master.getMaestroMaquinas().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceM = result.datos;
          this.totalRecordsM = result.datos.length;
          this.mCampos = [];
          this.loading = false;
          if (this.datasourceM.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.mCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaM.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
           this.mview=true;
          this.loadingPage=false;


        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.mview=false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de maquinas ');
        this.mview=false;
        this.loadingPage=false;        
      })

    this.primengConfig.ripple = true;
  }
  loadSedes(){
    this.datasourceS = [];
    this.totalRecordsS = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaS=[];

    this.master.getMaestroSedes().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceS = result.datos;
          this.totalRecordsS = result.datos.length;
          this.loading = false;
          this.sCampos = [];
          if (this.datasourceS.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.sCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaS.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.sview=true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.sview=false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de sedes  ');
        this.sview=false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }

  loadAuxiliares(){
    this.datasourceAUX = [];
    this.totalRecordsAUX = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaA=[];

    this.master.getMaestroAuxiliares().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceAUX = result.datos;
          this.totalRecordsAUX = result.datos.length;
          this.loading = false;
          this.aCampos = [];
          if (this.datasourceAUX.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.aCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaA.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.auxview=true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.auxview=false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de auxiliares   ');
        this.auxview=false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadUnidadNegocio(){
    this.datasourceU = [];
    this.totalRecordsU = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaUN=[];

    this.master.getMaestroUnidadNegocio().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceU = result.datos;
          this.totalRecordsU = result.datos.length;
          this.loading = false;
          this.unCampos = [];
          if (this.datasourceU.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.unCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaUN.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.unview=true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.unview=false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de unidad de negocio  ');
        this.unview=false;
        this.loadingPage=false;
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadTipoMoneda(){
    this.datasourceMon = [];
    this.totalRecordsMon = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaTM=[];

    this.master.getMaestroTipoMoneda().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceMon = result.datos;
          this.totalRecordsMon = result.datos.length;
          this.loading = false;
          this.tmCampos = [];
          if (this.datasourceMon.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.tmCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaTM.push({field: 'idcia', order: -1});
                }
              }
          }
          if(this.multiSortMetaTM.length ==  0){
            this.multiSortMetaTM.push({});
          }
          } 
          this.monview = true;
          this.loadingPage=false;

        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);

          this.monview = false;
          this.loadingPage=false;


        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de tipo de moneda  ');
        this.monview = false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadTipoArea(){
    this.datasourceA = [];
    this.totalRecordsA = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaTA=[];

    this.master.getMaestroTipoAreas().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceA = result.datos;
          this.totalRecordsA = result.datos.length;
          this.loading = false;
          this.taCampos = [];
          if (this.datasourceA.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.taCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaTA.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.aview=true;
          this.loadingPage=false;


        }else{
          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);

          this.aview=false;
          this.loadingPage=false;

        }
      },
      error => {
        this.loadingPage=false;
        this.aview=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }
  loadCentroCosto(){
    this.datasourceCC = [];
    this.totalRecordsCC = 0;
    this.loading = true;
    this.loadingPage=true;
    this.multiSortMetaCC=[];

    this.master.getMaestroCostos().subscribe(
      result => {
        if(result.status == "ok"){
          this.datasourceCC = result.datos;
          this.totalRecordsCC = result.datos.length;
          this.loading = false;
          this.ccCampos = [];
          if (this.datasourceCC.length > 1){
            for (var x in result.datos[0]) {
              if (result.datos[0].hasOwnProperty(x)) {
                 this.ccCampos.push({field:  x, header: x});
                 if(x == 'idcia'){
                  this.multiSortMetaCC.push({field: 'idcia', order: -1});
                }
              }
          }
          } 
          this.ccview=true;
          this.loadingPage=false;

        }else{

          this.notify.showNotification('top', 'right', 3, result.datos[0].detail);
          this.ccview=false;
          this.loadingPage=false;

          
        }
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos de centro de costos  ');
        this.ccview=false;
        this.loadingPage=false;


        
      })

    this.loading = true;
    this.primengConfig.ripple = true;
  }

  loadMaster(maestro:string){
    this.loadingPage=true;

    this.master.getLoadMaster(maestro).subscribe(
      resul => {
        if(resul.status == 'ok'){
          this.notify.showNotification('top', 'right', 2, 'Se cargó correctamente la tabla de '+maestro);
          this.loadingPage=false;

        }else{   
        this.notify.showNotification('top', 'right', 4, 'Error al cargar la tabla de maestro  '+maestro);
        this.loadingPage=false;

        }

      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al cargar la tabla de maestro  '+maestro);
        this.loadingPage=false;


      }
    )
  }
  
  applyFilterGlobalFC($event: any, stringVal: any){
    this.dtfc.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalTS($event: any, stringVal: any){
    this.dtts.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalP($event: any, stringVal: any){
    this.dtp.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalM($event: any, stringVal: any){
    this.dtm.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalS($event: any, stringVal: any){
    this.dts.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalAux($event: any, stringVal: any){
    this.dta.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalUN($event: any, stringVal: any){
    this.dtun.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalTM($event: any, stringVal: any){
    this.dttm.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalTA($event: any, stringVal: any){
    this.dtta.filterGlobal($event.target.value, 'contains');
  }
  applyFilterGlobalCC($event: any, stringVal: any){
    this.dtcc.filterGlobal($event.target.value, 'contains');
  }
  clear(table: Table) {
      table.clear();
  }
  handleChangeMaster(event:any){
    if(event.index == 1 ){
      this.loadFlujoCaja();
    }
  }
  handleChangeViewMaster(event:any){
    if(event.index == 0 ){
      this.loadFlujoCaja();
    }else if(event.index == 1){
      this.loadTipoServicio();
    }else if(event.index == 2){
      this.loadProyectos();
    }else if(event.index == 3){ 
      this.loadMaquinas();
    }else if(event.index == 4){
      this.loadSedes();
    }else if(event.index == 5){
      this.loadAuxiliares();
    }else if(event.index == 6){
      this.loadUnidadNegocio();
    }else if(event.index == 7){
      this.loadTipoMoneda();
    }else if(event.index == 8){
      this.loadTipoArea();
    }else if(event.index == 9){
      this.loadCentroCosto();
    }
  }
  LoadMaestro(maestro:string){
    this.loadMaster(maestro);
  }
  alertDialog(Titulo:string,Mensaje:string){
    this.dialogTitulo = Titulo;
    this.dialogMensaje = Mensaje;
    this.displayPosition = true;
  }
  
  


}
