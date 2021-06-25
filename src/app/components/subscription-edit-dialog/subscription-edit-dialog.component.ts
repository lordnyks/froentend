import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISubscription } from '../../models/ISubscription';
import { AuthService } from '../../services/auth/auth.service';
import { ExpirationsService } from '../../services/expirations.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionRovComponent } from '../option-rov/option-rov.component';

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
  private expirations: ExpirationsService, private snackBar: MatSnackBar ) {
   }

  ngOnInit(): void {

    this.subscription = this.data;

    this.formGroup = this.formBuilder.group({
      plateNumber: [this.subscription.plateNumber, [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]], // B\\s[0-9]{2,3}\\s[A-Z]{3}
      made: [this.subscription.model, [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      model: [this.subscription.made, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
      expireDate: [this.subscription.expireDate, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }


  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { plateNumber, made, model, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(new Date(expireDate));
    let myTempString = new Date().toLocaleDateString();


    
    this.authService.updateSubscription(this.subscription.id, {email: this.subscription.email, plateNumber: plateNumber, made: made, model: model, expireDate: myTempDate, description: this.subscription.description} as ISubscription).subscribe( 
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
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
  