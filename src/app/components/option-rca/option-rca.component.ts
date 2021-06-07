import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { UserProfileComponent } from '../user-profile/user-profile.component';


import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ISubscription } from 'src/app/models/ISubscription';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ExpirationsService } from 'src/app/services/expirations.service';



@Component({
  selector: 'app-option-rca',
  templateUrl: './option-rca.component.html',
  styleUrls: ['./option-rca.component.css']
})
export class OptionRcaComponent implements OnInit {
  displayedColumns: string[] = ['plateNumber', 'made', 'model', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  public dialogRef!: MatDialogRef<AcceptDialogComponent>
  @ViewChild('f') form: any;

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent, private authService: AuthService, private dialog: MatDialog,
    public expirations: ExpirationsService) { }

  ngOnInit(): void {

    this.refreshUsers();
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]],
      made: ['BMW', [Validators.required, Validators.minLength(2), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      model: ['X1', [Validators.required, Validators.minLength(1), Validators.maxLength(32), Validators.pattern('[a-zA-Z0-9]+')]],
      expireDate: [new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 999))), [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, plateNumber, made, model, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(expireDate);

    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, this.userProfile.dateNow, firstName, lastName, myTempDate, plateNumber, made, model, this.userProfile.selected).subscribe( 
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
