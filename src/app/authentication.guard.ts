import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private messageBar: MatSnackBar) {

  }
  
  
  canActivate(): boolean {
    let isLoggedIn: boolean = this.authService.isLoggedIn();

    if(isLoggedIn) {
      console.log('auth-guard');
      return true;
    } else {
      this.messageBar.open('Loghează-te pentru a accesa această pagină!', 'Închide', { duration: 3000});
      this.router.navigate(['login']);
      return false;
    }
  }
  

}
