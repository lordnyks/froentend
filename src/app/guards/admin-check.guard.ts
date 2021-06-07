import { Injectable, OnInit } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminCheckGuard implements CanLoad {

  private role: string;
  private isLogged: boolean;
  constructor(private authService: AuthService, private route: Router) {
    this.role = this.authService.getUserRole();
    this.isLogged = this.authService.isLoggedIn();
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isLogged = this.authService.isLoggedIn();
      this.role = this.authService.getUserRole();

      if(this.isLogged && (this.role == 'ROLE_ADMIN' || this.role == 'ROLE_MODERATOR' || this.role == 'ROLE_SUPERVISOR' || this.role == 'ROLE_HELPER')) {
        return true;
      }

      console.log('can load');
      this.route.navigate(['home']);
      return false;
  }
}
