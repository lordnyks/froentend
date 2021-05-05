import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../models/IUser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public user!: IUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
       
  ngOnInit() : void {
    if(this.isLoggedIn()) {
      this.authService.retrieveUser(this.authService.getUsername()).subscribe(result => {
        this.authService.setUser(result[0]);
        this.user = result[0]; 
      });
    }
   }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  isAuthorized() : boolean {
    const myRole = this.authService.getUserRole();
    if(myRole == 'ROLE_ADMIN' || myRole == 'ROLE_MODERATOR' || myRole == 'ROLE_SUPERVISOR' || myRole == 'ROLE_HELPER') {
      return true;
    }

    return false;

  }

  logout() {
    this.router.navigate(['home']);
    this.authService.clearUser();
    this.authService.signOut();
  }

}
