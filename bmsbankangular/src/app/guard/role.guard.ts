import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
      private authService: UserService,
      private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      const expectedRole = route.data['role'] as Array<string>;
      const roles = this.authService.getUserRole();
      

      return this.authService.userRole$.pipe( // userRole$ observable from AuthService
        map(role => {
          if (role && expectedRole.includes(role)) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    }
}