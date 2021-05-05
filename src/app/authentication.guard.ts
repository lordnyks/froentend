import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenStorageService } from './services/auth/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: TokenStorageService, private router: Router) {

  }
  
  isLoggedIn = this.authService.isLoggedIn();

  canActivate(): boolean {
    if(this.isLoggedIn && this.authService.getUserRole() == 'ROLE_ADMIN') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
