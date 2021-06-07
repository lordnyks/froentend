import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

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

  onSubmit() {
    const email= this.formControl.value;
    const role = this.role.value;
    
    if(!(email != '' && role != '')) {
      return;
    }


    this.authService.setRole(email, role, this.authService.getUsername()).subscribe(
      data => {
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


}
