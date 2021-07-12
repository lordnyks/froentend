import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISubscription } from '../../models/ISubscription';
import { AuthService } from '../../services/auth/auth.service';
import { ExpirationsService } from '../../services/expirations.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionRovComponent } from '../option-rov/option-rov.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ISubscriptionSaverHelper } from '../../models/ISubscriptionSaverHelper';
import { ValidationFieldsService } from '../../services/validation-fields.service';

@Component({
  selector: 'app-subscription-edit-dialog',
  templateUrl: './subscription-edit-dialog.component.html',
  styleUrls: ['./subscription-edit-dialog.component.css']
})
export class SubscriptionEditDialogComponent implements OnInit {

  public confirmMessage!: string;
  public subscription!: ISubscription;
  public formGroup!: FormGroup;
  @ViewChild('f') form: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ISubscription, public dialog: MatDialogRef<SubscriptionEditDialogComponent>, private formBuilder: FormBuilder, private authService: AuthService,
  private expirations: ExpirationsService, private snackBar: MatSnackBar, private validations: ValidationFieldsService ) {
   }

  ngOnInit(): void {

    this.subscription = this.data;

    this.formGroup = this.formBuilder.group({
      plateNumber: [this.subscription.plateNumber, [Validators.required, Validators.pattern(this.validations.patternForPlateNumber)]],
      made: [this.subscription.made, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      model: [this.subscription.model, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
      expireDate: [this.subscription.expireDate, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }


  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { plateNumber, made, model, expireDate } = this.formGroup.value;


    console.log(`Made: ${made} + Model: ${model}`);
    let myTempDate = this.expirations.getRightDate(new Date(expireDate));
    // let myTempString = new Date().toLocaleDateString();


    
    this.authService.updateSubscriptionCars(this.subscription.id, {email: this.subscription.email, plateNumber: plateNumber, made: made,model: model,expireDate: myTempDate } as ISubscriptionSaverHelper ).subscribe( 
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
  