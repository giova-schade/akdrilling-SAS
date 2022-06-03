import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdabdf-layout",
  templateUrl: "./akdabdf-layout.component.html",
  styleUrls: ["./akdabdf-layout.component.scss"]
})
export class AkdabdfLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
  }
}
