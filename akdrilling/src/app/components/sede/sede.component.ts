import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import * as $ from "jquery";
interface Sedes {
    IdCia: string,
    NomSede: string
}
@Component({
    selector: "app-sede",
    templateUrl: "sede.component.html",
    styleUrls: ["sede.component.css"]
  })
  export class SedeComponent implements OnInit {
      displayPosition: boolean;
      usurio: any;
      sedesSelected!: Sedes;
      sedes!: Sedes[];
      selecetdSede: string;

    constructor(private authService: AuthService) {
        this.displayPosition= true ;
        this.selecetdSede = '';
    }

    ngOnInit() {
        this.usurio = this.authService.GetuserInfo();
        if(this.usurio.info.sede.length > 1 ){
            this.sedes = this.usurio.info.sede;
            this.displayPosition= true ;  
        } else {
            this.usurio.info.sede = this.usurio.info.sede[0];
            //$("#id_sede").text(`Sede: ${this.usurio.info.sede.NomSede}`)
        }       
    }
    onChange(event:any){
        console.log(event);
        this.usurio.info.sede = event.value;
        this.displayPosition= false;  
        //$("#id_sede").text( `Sede: ${this.usurio.info.sede.NomSede}`)
    }


  }