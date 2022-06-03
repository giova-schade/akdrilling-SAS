import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdaafe-layout",
  templateUrl: "./akdaafe-layout.component.html",
  styleUrls: ["./akdaafe-layout.component.scss"]
})
export class AkdaafeLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
