import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { IUser } from 'src/app/models/IUser';
import { UserDetailsService } from '../../services/user-details.service';
import { AuthService } from '../../services/auth/auth.service';
import { HomeComponent } from '../home/home.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public numberOfUsers: number = 0;
  public numberOfUsers$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public messageAbout: string = "";
  public routerLink: string = "/home";
  
  
  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.messageAbout = "Adaugă-ți un document";
      this.routerLink = "/user-profile";
    } else {
      this.messageAbout = "Înregistrează-te";
      this.routerLink = "/register";
    }
  }

  constructor(private infoService: UserDetailsService, public authService: AuthService) {
    this.infoService.getNumberOfUsers().subscribe(data => this.numberOfUsers$.next(data));
    this.numberOfUsers$.asObservable().subscribe(data => this.numberOfUsers = data);  
  }


}