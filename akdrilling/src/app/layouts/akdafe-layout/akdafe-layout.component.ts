import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdafe-layout",
  templateUrl: "./akdafe-layout.component.html",
  styleUrls: ["./akdafe-layout.component.scss"]
})
export class AkdafeLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
