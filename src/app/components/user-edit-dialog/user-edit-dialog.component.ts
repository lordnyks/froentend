import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersPanelComponent } from '../users-panel/users-panel.component';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ValidationFieldsService } from '../../services/validation-fields.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {

  myUser!: IUser;
  public updateUserDetailsForm!: FormGroup;
  public dateNow: Date = new Date();
  public selectedType!: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser, private dialogRef: MatDialogRef<UserEditDialogComponent>, private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
  public validations: ValidationFieldsService) { }

  ngOnInit(): void {
    this.myUser = this.data;
    this.updateUserDetailsForm = this.formBuilder.group({
      firstName: [this.myUser.profile?.firstName, [Validators.required, Validators.pattern('^[a-zA-Z-ăĂâÂîÎșȘțȚ]+$') ]],
      lastName: [this.myUser.profile?.lastName, [Validators.required,  Validators.pattern('^[a-zA-ZăĂâÂîÎșȘțȚ]+$')]],
      phoneNumber: [this.myUser.profile?.phoneNumber, [Validators.required, Validators.pattern(this.validations.patternForNumber)]],
      dateOfBirth: [this.myUser.profile?.dateOfBirth, [Validators.required]],
      county: [this.myUser.profile?.address?.county, [Validators.pattern('^[a-zA-ZăĂâÂîÎțȚșȘ]+$')]],
      city: [this.myUser.profile?.address?.city, [Validators.pattern('^[a-zA-ZăĂâÂîÎțȚșȘ]+$')]],
      townShip: [this.myUser.profile?.address?.townShip, [Validators.pattern('^[a-zA-ZăĂâÂîÎțȚșȘ]+$')]],
      street: [this.myUser.profile?.address?.street, [Validators.pattern('^[a-zA-ZăĂâÂîÎțȚșȘ]+$')]],
      gateNumber: [this.myUser.profile?.address?.gateNumber],
      gender: [this.myUser.profile?.gender ],
      cnp: [this.myUser.profile?.personalIdentificationNumber, [Validators.pattern(this.validations.patternForCNP)]]
      
    });
  }


  getUser() {

  }
  updateUserDetails() {
   this.myUser = this.data;

   if(this.updateUserDetailsForm.invalid) {
     this.openSnackBar('Datele introduse sunt invalide');
     return;
   }
    const {firstName, lastName, phoneNumber, dateOfBirth, county, city, townShip, street, gateNumber, gender, cnp } = this.updateUserDetailsForm.value;
    let tempUser: IUser = {
      password: this.myUser.password,
      email: this.myUser.email,
      username: this.myUser.username,
      profile: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: {
          county: county,
          city: city,
          townShip: townShip,
          village: this.myUser.profile?.address?.village,
          street: street,
          gateNumber: gateNumber
        },
        dateOfBirth: dateOfBirth,
        gender: gender,
        age: this.myUser.profile?.age,
        personalIdentificationNumber: cnp
      }
    };
    this.authService.updateUser(tempUser, this.myUser.id!).subscribe(
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        this.dialogRef.close();
        // this.usersPanelComponent.ngAfterViewInit();

      }, 
      err => {
        this.openSnackBar('Salvarea a esuat!');
        this.ngOnInit();
      }
    );
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }
}
