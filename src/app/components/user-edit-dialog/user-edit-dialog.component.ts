import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersPanelComponent } from '../users-panel/users-panel.component';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {

  myUser!: IUser;
  public updateUserDetailsForm!: FormGroup;
  public dateNow: Date = new Date();


  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser, private dialogRef: MatDialogRef<UserEditDialogComponent>, private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar/*, private usersPanelComponent: UsersPanelComponent*/) { }

  ngOnInit(): void {
    this.myUser = this.data;
    this.updateUserDetailsForm = this.formBuilder.group({
      firstName: [this.myUser.profile?.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+') ]],
      lastName: [this.myUser.profile?.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      phoneNumber: [this.myUser.profile?.phoneNumber, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
      dateOfBirth: [this.myUser.profile?.dateOfBirth, [Validators.required]]
    });
  }


  getUser() {

  }
  updateUserDetails() {
   this.myUser = this.data;

    console.log(this.myUser);
    const {firstName, lastName, phoneNumber, dateOfBirth } = this.updateUserDetailsForm.value;
    let tempUser: IUser = {
      password: this.myUser.password,
      email: this.myUser.email,
      username: this.myUser.username,
      profile: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: {
          county: this.myUser.profile?.address?.county,
          city: this.myUser.profile?.address?.city,
          townShip: this.myUser.profile?.address?.townShip,
          village: this.myUser.profile?.address?.village,
          street: this.myUser.profile?.address?.street,
          gateNumber: this.myUser.profile?.address?.gateNumber
        },
        dateOfBirth: dateOfBirth,
        gender: this.myUser.profile?.gender,
        age: this.myUser.profile?.age,
        personalIdentificationNumber: this.myUser.profile?.personalIdentificationNumber
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
