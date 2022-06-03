import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdabop-layout",
  templateUrl: "./akdabop-layout.component.html",
  styleUrls: ["./akdabop-layout.component.scss"]
})
export class AkdabopLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
