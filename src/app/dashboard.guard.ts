import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private authService: TokenStorageService, private router: Router) {

  }

  isLoggedIn = this.authService.isLoggedIn();

  canActivate() : boolean {
    console.log('asdasd');
    if(this.isLoggedIn) {
      // this.router.navigate(['/home']);
      return true;
    }  
    return false;
  }
  
}
