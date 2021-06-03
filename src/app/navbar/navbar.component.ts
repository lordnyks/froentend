import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../models/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from '../models/ISubscription';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  public user!: IUser;
  public expireAlert: BehaviorSubject<ISubscription[]> = new BehaviorSubject<ISubscription[]>([]);
  public myInterval: any;
  public alertNumber: number = 0;
  public notificationsList!: Array<ISubscription>;
  public isLogged: boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
       
  ngOnInit() : void {
    
    this.isLogged = this.isLoggedIn();
    console.log(this.isLoggedIn())
    if(this.isLogged) {
      this.myInterval = setInterval(
        () => {
          this.authService.getSubscriptionByEmail(this.authService.getUsername()).subscribe(data => {
            this.expireAlert.next(data.filter(item => {

            let myDate = new Date(item.expireDate);
            let secondDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(),
                                      new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
            
            
         
            if(new Date(new Date().setDate(new Date().getDate() + 10)) >= secondDate) {
              return true;
            }

            return false;
          }))
          
        })
      }, 2000);

   
    this.getNotifications();
  
  
    
      this.authService.retrieveUser(this.authService.getUsername()).subscribe(result => {
        this.authService.setUser(result[0]);
        this.user = result[0]; 
      });
    }
  }
  
  getNotifications() {
    this.expireAlert.asObservable().subscribe(data =>  {
      this.alertNumber = data.length;
  
      this.notificationsList = data;   

      // console.log(data);
      // console.log(this.authService.getUsername());
    });
  }
  

  ngOnDestroy() {
    clearInterval(this.myInterval);
    this.expireAlert.next([]);
    this.expireAlert.complete();
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
    this.isLogged = false;
    this.router.navigate(['home']);
    this.authService.clearUser();
    this.authService.signOut();
  }

}
