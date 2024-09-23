import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user.service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  
}