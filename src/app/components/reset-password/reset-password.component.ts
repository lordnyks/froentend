import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordFormComponent } from '../reset-password-form/reset-password-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public buttonMessage: string = "Trimite email";

  public dialogForm!: MatDialogRef<ResetPasswordFormComponent>;
  public FormGroup!: FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder, private dialog: MatDialog,
    public dialogRef: MatDialogRef<ResetPasswordComponent>) {

    this.FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
   }

  ngOnInit(): void {

  }


  onSubmit() {


    const {email} = this.FormGroup.value;

    if(this.FormGroup.invalid) 
      return;


    this.authService.sendEmail(email);
    this.dialogForm = this.dialog.open(ResetPasswordFormComponent, {
      data: email
    });
    this.dialogRef.close();
    // this.dialogForm.afterClosed().subscribe(result => {
    //   if(result) {


    //   }

    // });
    
    }

  }



  

