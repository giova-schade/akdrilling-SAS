import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import { CanActivate, Router } from '@angular/router';
@Component({
  selector: "app-akdabop-layout",
  templateUrl: "./akdabop-layout.component.html",
  styleUrls: ["./akdabop-layout.component.scss"]
})
export class AkdabopLayoutComponent implements OnInit {
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
