import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import * as $ from "jquery";
interface Sedes {
  IdCia: string,
  NomSede: string
}

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {
  displayPosition: any;
  usurio: any;
  cias: any;

  sedesSelected!: any ;
  sedes!: Sedes[];
  selecetdSede: string;

  constructor(private authService: AuthService) {
    this.displayPosition = true;
    this.selecetdSede = '';
  }

  ngOnInit() {
    this.usurio = this.authService.GetuserInfo();
    this.cias = this.authService.GetCias();
    if (this.cias.info.sede.length > 1) {
      this.sedes = this.cias.info.sede;
      this.displayPosition = true;
    } else {
      this.usurio.info.sede = this.cias.info.sede[0];
      this.usurio.ciaSelected= this.usurio.info.sede;
    }
  }
  onChange(event: any) {
    console.log(event);
    this.usurio.ciaSelected= event.value;
    this.displayPosition = false;
  }

}
