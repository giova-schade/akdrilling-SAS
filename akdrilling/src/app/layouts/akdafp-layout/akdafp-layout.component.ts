import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdafp-layout",
  templateUrl: "./akdafp-layout.component.html",
  styleUrls: ["./akdafp-layout.component.scss"]
})
export class AkdafpLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
