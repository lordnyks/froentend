import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubscription } from 'src/app/models/ISubscription';
import { ISubscriptionSaverHelper } from 'src/app/models/ISubscriptionSaverHelper';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { SubscriptionEditDialogComponent } from '../subscription-edit-dialog/subscription-edit-dialog.component';

@Component({
  selector: 'app-subscription-rlb-edit-dialog',
  templateUrl: './subscription-rlb-edit-dialog.component.html',
  styleUrls: ['./subscription-rlb-edit-dialog.component.css']
})
export class SubscriptionRlbEditDialogComponent implements OnInit {

  public formGroup!: FormGroup;
  public subscription!: ISubscription;
  @ViewChild('f') form: any;
  

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ISubscription, private expirations: ExpirationsService, private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialogRef<SubscriptionEditDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = this.data;
    this.formGroup = this.formBuilder.group({
      lastName: [this.subscription.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      firstName: [this.subscription.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      banca: [this.subscription.banca, [Validators.required]],
      expireDate: [this.subscription.expireDate, [Validators.required]],      
    });

  }

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, banca, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(new Date(expireDate));

    
    this.authService.updateSubscriptionCars(this.subscription.id, {email: this.subscription.email, firstName: firstName, lastName: lastName, banca: banca,expireDate: myTempDate } as ISubscriptionSaverHelper).subscribe( 
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        console.log(data);
        this.dialog.close(true);
        this.form.reset();

      }, 
      err => {
        this.openSnackBar(err.error.message);
      });

  }

  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }

}
