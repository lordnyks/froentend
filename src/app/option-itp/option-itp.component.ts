import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthService } from '../services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscription } from '../models/ISubscription';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpirationsService } from '../expirations.service';

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
  @ViewChild('f') myNgForm: any;

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent, private authService: AuthService, 
    private dialog: MatDialog, private snackBar: MatSnackBar, public expirations: ExpirationsService) { }

  ngOnInit() : void {
    this.refreshUsers();
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]],
      made: ['Dacia', [Validators.required, Validators.minLength(2),, Validators.pattern('[a-zA-Z]+')]],
      model: ['Sandero', [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z0-9]+')]],
      expireDate: [new Date(), [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
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
        this.myNgForm.reset();
        
      }, 
      err => {
        // this.errorMessage = err.error.message;
        this.userProfile.openSnackBar(`Salvarea a esuat!`);
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
