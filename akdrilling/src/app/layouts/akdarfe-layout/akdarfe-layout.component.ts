import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.services';

@Component({
  selector: "app-akdarfe-layout",
  templateUrl: "./akdarfe-layout.component.html",
  styleUrls: ["./akdarfe-layout.component.scss"]
})
export class AkdarfeLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  usurio: any;
  constructor(private authService: AuthService) {
    
  }

  
  ngOnInit() {
    
  }
}
