import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdabrrhh-layout",
  templateUrl: "./akdabrrhh-layout.component.html",
  styleUrls: ["./akdabrrhh-layout.component.scss"]
})
export class AkdabrrhhLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
