import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthService } from '../services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscription } from '../models/ISubscription';

@Component({
  selector: 'app-option-carteidentitate',
  templateUrl: './option-carteidentitate.component.html',
  styleUrls: ['./option-carteidentitate.component.css']
})
export class OptionCarteidentitateComponent implements OnInit {

  displayedColumns: string[] = ['lastName', 'firstName', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  
  @ViewChild('f') myNgForm: any;
  public formGroup!: FormGroup;

  public nume: string =  '';
  public prenume: string = '';

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent, private dialog: MatDialog, private authService: AuthService) {
    this.nume = userProfile.nume;
    this.prenume = userProfile.prenume;
   }

  ngOnInit(): void {

    this.refreshUsers();
    
    

    this.formGroup = this.formBuilder.group({
      firstName: [this.nume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.prenume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      expireDate: [new Date(), [Validators.required]],      
    });
  }

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, plateNumber, made, model, expireDate } = this.formGroup.value;


    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, this.userProfile.dateNow, firstName, lastName, expireDate, plateNumber, made, model, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
        this.myNgForm.reset();
        
      }, 
      err => {
        // this.errorMessage = err.error.message;
        this.userProfile.openSnackBar(`Salvarea a esuat!`);
      });

  }

  confirm(id: number) {
    this.userProfile.confirm(id);
  }


  refreshUsers() {
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'ci').subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }


}
