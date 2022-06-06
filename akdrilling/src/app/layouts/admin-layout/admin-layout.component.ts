import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usuario!: any;
  usurio: any;
  constructor(private authService: AuthService , private router: Router) {
    
  }

  
  ngOnInit() {
    this.usuario = this.authService.GetuserInfo();
    this.router.navigate(['/' + this.usuario.role + '/Home']) 
  }
}
