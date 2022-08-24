import { CanActivate, Router, ActivatedRouteSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.services';
import { Role } from './models/role';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (Object.keys(this.authService['user']).length > 0) {
            if (!this.authService.isAuthorized()) {
                this.router.navigate(['login']);
                return false;
            }

            const roles = route.data.roles as Role[];
            if (roles && !roles.some(r => this.authService.hasRole(r))) {
                this.router.navigate(['access-denied']);
                return false;
            }

            return true;
        } else {
            return false;
        }

    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            return false;
        }

        const roles = route.data && route.data.roles as Role[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            return false;
        }

        return true;
    }
}
