import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<IUser[]> {


  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> {

    return this.authService.retrieveUser(this.authService.getUsername());
  }
}
