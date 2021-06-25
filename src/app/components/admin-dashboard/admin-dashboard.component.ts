import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { SubscriptionsPanelComponent } from '../subscriptions-panel/subscriptions-panel.component';
import { UsersPanelComponent } from '../users-panel/users-panel.component';
import { UsersStatisticsComponent } from '../users-statistics/users-statistics.component';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  @ViewChild(UsersStatisticsComponent) private componentUpdateStatistics!: UsersStatisticsComponent;
  @ViewChild(UsersPanelComponent) private componentUpdateUsersPanel!: UsersPanelComponent;
  @ViewChild(SubscriptionsPanelComponent) private componentUpdateSubscriptions!: SubscriptionsPanelComponent;
  public formControl = new FormControl('', [Validators.required, Validators.email]);
  public role = new FormControl('', [Validators.required]);
  public selected = 'ROLE_MEMBER';
  public userRole!: string;
  options!: string[];
  filteredOptions!: Observable<string[]>;
  

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    
    this.authService.getAllEmails().subscribe(data => {
      this.options = data;
      this.filteredOptions = this.formControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
      
    });
  }


  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  canSeeTab() : boolean{
    return this.authService.isLoggedIn() && (this.authService.getUserRole() == 'ROLE_ADMIN' ||  this.authService.getUserRole() == 'ROLE_SUPERVISOR');
  }
  canSeeStatistics() : boolean {
    return this.authService.isLoggedIn() && (this.authService.getUserRole() == 'ROLE_ADMIN' ||  this.authService.getUserRole() == 'ROLE_SUPERVISOR' || this.authService.getUserRole() == 'ROLE_MODERATOR' || this.authService.getUserRole() == 'ROLE_HELPER');
  }

  canSeeUsersRoles() : boolean {
    return this.authService.isLoggedIn() && (this.authService.getUserRole() == 'ROLE_ADMIN' ||  this.authService.getUserRole() == 'ROLE_SUPERVISOR' || this.authService.getUserRole() == 'ROLE_MODERATOR');
  }
  onSubmit() {
    const email= this.formControl.value;
    const role = this.role.value;
    
    if(!(email != '' && role != '')) {
      return;
    }


    this.authService.setRole(email, role, this.authService.getUsername()).subscribe(
      data => {
        this.componentUpdateStatistics.getRoles();
        this.message(`${email} are acum rolul de ${this.interpretateRole(role)}.`);
      }, 
      err => {
        this.message(err.error.message);

      }
    );
  }

  private interpretateRole(input: string) : string {
    switch(input) {
      case "ROLE_MEMBER":
        return "membru"; 
      case "ROLE_HELPER":
        return "helper";
      case "ROLE_MODERATOR":
        return "moderator";
      case "ROLE_SUPERVISOR":
        return "supervisor";
      case "ROLE_ADMINISTRATOR":
        return "administrator";
      default:
        return 'necunoscut';
    }
  }

  public getRole(input: string) {
    this.authService.getRole(input).subscribe(data => {

      if(data === 'ROLE_ADMIN') {
        this.message('Nu poti schimba rolul unui administrator!');
        console.log(data);
        return;
      }
    });
  }
  public message(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2500,
    });
  }

  onTabChange(event : MatTabChangeEvent) {
    
    
    // this.componentUpdateUsersPanel.ngAfterViewInit();
    //  this.componentUpdateStatistics.getMades();
    // this.componentUpdateSubscriptions.ngOnInit();
}


}
