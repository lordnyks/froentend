import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  

  public hidePassword = true;
  public formGroup!: FormGroup;
  private email: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef:MatDialogRef<ResetPasswordFormComponent>,private authService: AuthService, private formBuilder: FormBuilder) { 
    this.email = data;

    this.formGroup = this.formBuilder.group({
      cod: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
   
  }

  ngOnInit(): void {
    
  }


  onSubmit() {
    const {cod, password} = this.formGroup.value;

    if(this.formGroup.invalid) 
      return;
    this.authService.savePassword(this.email, {password: password, token: cod}) ? this.dialogRef.close() : 'asd';

     this.dialogRef.close(true);
    
    
  }

}
