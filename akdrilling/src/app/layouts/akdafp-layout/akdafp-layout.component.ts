import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import { CanActivate, Router } from '@angular/router';
@Component({
  selector: "app-akdafp-layout",
  templateUrl: "./akdafp-layout.component.html",
  styleUrls: ["./akdafp-layout.component.scss"]
})
export class AkdafpLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  usuario!: any;
  constructor(private authService: AuthService , private router: Router) {
    
  }

  
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();
    this.router.navigate(['/' + this.usuario.role + '/Home']) 
  }
}
