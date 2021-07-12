import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { UserProfileComponent } from '../user-profile/user-profile.component';


import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ISubscription } from 'src/app/models/ISubscription';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { SubscriptionEditDialogComponent } from '../subscription-edit-dialog/subscription-edit-dialog.component';
import { ValidationFieldsService } from '../../services/validation-fields.service';



@Component({
  selector: 'app-option-rca',
  templateUrl: './option-rca.component.html',
  styleUrls: ['./option-rca.component.css']
})
export class OptionRcaComponent implements OnInit {
  displayedColumns: string[] = ['plateNumber', 'made', 'model', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  public dialogRef!: MatDialogRef<AcceptDialogComponent>
  public dialogRefEditSubscription!: MatDialogRef<SubscriptionEditDialogComponent>;
  @ViewChild('f') form: any;

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent, private authService: AuthService, private dialog: MatDialog,
    public expirations: ExpirationsService, private validations: ValidationFieldsService) { }

  ngOnInit(): void {

    this.refreshUsers();
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern(this.validations.patternForPlateNumber)]],
      made: ['BMW', [Validators.required]],
      model: ['X1', [Validators.required]],
      expireDate: [new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 999))), [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  edit(id: number) {


    this.authService.getSubscriptionBy(id).subscribe(data => {
      console.log(id);
      console.log(data);
      this.dialogRefEditSubscription = this.dialog.open(SubscriptionEditDialogComponent, {
        data: data
      });

      this.dialogRefEditSubscription.afterClosed().subscribe(result => {
        if(result) {
          this.ngOnInit();
          console.log('yes');
        }
      });
    });
 



  }

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, plateNumber, made, model, expireDate } = this.formGroup.value;

    console.log(expireDate);
    let myTempDate = this.expirations.getRightDate(expireDate);
    let myTempString = this.userProfile.dateNow.toLocaleDateString();

    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, myTempString, firstName, lastName, undefined, myTempDate, plateNumber, made, model, undefined, undefined, undefined, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
        this.form.reset();
        
      }, 
      err => {

        this.userProfile.openSnackBar(err.error.message);
      });

  }

  confirm(id: number) {
    
    this.dialogRef = this.dialog.open(AcceptDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Ești sigur că dorești să ștergi acest abonament?`;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.refreshUsers();
        this.remove(id);
      }
    });
  }

  remove(id: number) {
    this.authService.removeSubscription(id).subscribe(
      data => {
        this.userProfile.openSnackBar('Ștergerea a fost efectuată cu succes!');
        this.refreshUsers();
      },
      err => {
        this.userProfile.openSnackBar('Ștergerea a eșuat!');
      }
    )
  }

  reset() {
    this.form.resetForm();
  }

  refreshUsers() {
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'rca').subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }
}
