import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.services';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PrimeNGConfig } from 'primeng/api';
import { Role } from './models/role';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationsComponent]
})
export class AppComponent {
  title = 'akdrilling';
  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationsComponent,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.authService.getUser().subscribe(
      result => {
        this.login(result.role, result.Nombre, result.info, result.roleDescription, {});
      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos del usuario  ')
      }

    )

  }


  login(role: any, name: string, info: any, roleDescription: any, ciaSelected: any) {
    this.authService.login(role, name, info, roleDescription, ciaSelected);
    if (!this.authService.isAuthorized()){
      this.router.navigate(['access-denied']);
    }else{
      const rol = this.authService['user'].role  as Role;
      if (this.authService.hasRole(rol)){
        this.router.navigate(['/' + role]);
      }else{
        this.router.navigate(['access-denied']);
      }
      
    }

  }

}
