import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.services';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PrimeNGConfig } from 'primeng/api';
import { Role } from './models/role';
interface Roles {
  desgroup: string,
  group: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationsComponent]
})


export class AppComponent {
  roles: Roles[];
  usurio: any;
  rolesSelected!: Roles;
  displayPositionRoles: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationsComponent,
    private primengConfig: PrimeNGConfig) {
    this.roles = [];
    this.displayPositionRoles = false;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.authService.getUser().subscribe(
      result => {
        if (result.info.roles.length > 1) {
          //cargo todos los roles 
          this.authService.login(result.info.roles, result.info.roles[0]['group'], result.Nombre, result.info, result.info.roles[0]['desgroup'], {}, true);
          this.roles = result.info.roles;
          this.displayPositionRoles = true;
        } else {
          this.login(result.info.roles, result.info.roles[0]['group'], result.Nombre, result.info, result.info.roles[0]['desgroup'], {}, true);
        }

      },
      error => {
        this.notify.showNotification('top', 'right', 4, 'Error al obtener los datos del usuario  ')
      }

    )

  }
  rolChange(event: any) {
    this.usurio = this.authService.GetuserInfo();
    this.login(this.usurio.info.roles, event.value.group, this.usurio.name, this.usurio.info,  event.value.desgroup, {}, true);

    this.displayPositionRoles = false;

  }

  login(roles: any, role: any, name: string, info: any, roleDescription: any, ciaSelected: any, ready: any) {
    this.authService.login(roles, role, name, info, roleDescription, ciaSelected, ready);
    if (!this.authService.isAuthorized()) {
      this.router.navigate(['access-denied']);
    } else {
      const rol = this.authService['user'].role as Role;
      if (this.authService.hasRole(rol)) {
        this.router.navigate(['/' + role]);
      } else {
        this.router.navigate(['access-denied']);
      }
    }

  }

}
