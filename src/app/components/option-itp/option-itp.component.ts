import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';

import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { SubscriptionEditDialogComponent } from '../subscription-edit-dialog/subscription-edit-dialog.component';
import { ValidationFieldsService } from '../../services/validation-fields.service';



@Component({
  selector: 'app-option-itp',
  templateUrl: './option-itp.component.html',
  styleUrls: ['./option-itp.component.css']
})
export class OptionItpComponent implements OnInit {
  displayedColumns: string[] = ['plateNumber', 'made', 'model', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  public formGroup!: FormGroup;
  public dialogRef!: MatDialogRef<AcceptDialogComponent>;
  public dialogRefEditSubscription!: MatDialogRef<SubscriptionEditDialogComponent>;

  @ViewChild('f') myNgForm: any;

  constructor(private formBuilder: FormBuilder, private validation: ValidationFieldsService, private userProfile: UserProfileComponent, private authService: AuthService, 
    private dialog: MatDialog, private snackBar: MatSnackBar, public expirations: ExpirationsService) { }

  ngOnInit() : void {
    this.refreshUsers();
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern(this.validation.patternForPlateNumber)]],
      made: ['Dacia', [Validators.required]],
      model: ['Sandero', [Validators.required]],
      expireDate: [new Date(), [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
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

    let myTempDate = this.expirations.getRightDate(expireDate);
    let myTempString = this.userProfile.dateNow.toLocaleDateString();

    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, myTempString, firstName, lastName, undefined, myTempDate, plateNumber, made, model, undefined, undefined, undefined, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
        this.myNgForm.reset();
        
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
        this.openSnackBar('Ștergerea a fost efectuată cu succes!');
        this.refreshUsers();
      },
      err => {
        this.openSnackBar('Ștergerea a eșuat!');
      }
    )
  }
  reset() {
    this.myNgForm.resetForm();
  }

  refreshUsers() {
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'itp').subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }

}
