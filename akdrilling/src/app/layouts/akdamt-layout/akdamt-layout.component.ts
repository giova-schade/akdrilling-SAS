import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import { CanActivate, Router } from '@angular/router';
@Component({
  selector: "app-akdamt-layout",
  templateUrl: "./akdamt-layout.component.html",
  styleUrls: ["./akdamt-layout.component.scss"]
})
export class AkdamtLayoutComponent implements OnInit {
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
