import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionEditDialogComponent } from '../subscription-edit-dialog/subscription-edit-dialog.component';
import { ISubscriptionSaverHelper } from 'src/app/models/ISubscriptionSaverHelper';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { ValidationFieldsService } from '../../services/validation-fields.service';

@Component({
  selector: 'app-subscription-ci-edit-dialog',
  templateUrl: './subscription-ci-edit-dialog.component.html',
  styleUrls: ['./subscription-ci-edit-dialog.component.css']
})
export class SubscriptionCiEditDialogComponent implements OnInit {

  public formGroup!: FormGroup;
  public subscription!: ISubscription;
  @ViewChild('f') form: any;


  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ISubscription, private expirations: ExpirationsService, private authService: AuthService, private snackBar: MatSnackBar, public dialog: MatDialogRef<SubscriptionEditDialogComponent>, private formBuilder: FormBuilder, private validators: ValidationFieldsService) { }

  ngOnInit(): void {

    this.subscription = this.data;
    this.formGroup = this.formBuilder.group({
      firstName: [this.subscription.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.subscription.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      cnp: [this.subscription.personalIdentificationNumber, [Validators.pattern(this.validators.patternForCNP)]],
      expireDate: [new Date(), [Validators.required]],      
    });

  }


  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, cnp, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(expireDate);

    
    this.authService.updateSubscriptionCars(this.subscription.id, {email: this.subscription.email, firstName: firstName, lastName: lastName, personalIdentificationNumber: cnp,expireDate: myTempDate } as ISubscriptionSaverHelper ).subscribe( 
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
