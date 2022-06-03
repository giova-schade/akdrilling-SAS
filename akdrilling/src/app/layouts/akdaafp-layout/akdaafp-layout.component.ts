import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdaafp-layout",
  templateUrl: "./akdaafp-layout.component.html",
  styleUrls: ["./akdaafp-layout.component.scss"]
})
export class AkdaafpLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
