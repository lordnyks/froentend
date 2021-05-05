import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public isValid: string = '';
  public isSuccessful = false;
  public submitted = false;
  public errorMessage = '';
  public isSignUpFailed = false;
  public formGroup!: FormGroup;
  public selected = 'feminin';
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    
  }
  
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      dateOfBirth: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    });
  }

  onSubmit() : void {

    if(this.formGroup.invalid) {
      this.isValid = 'Câmpurile sunt necompletate sau invalide.';
      return;
    }

    const { firstName, lastName, dateOfBirth, email, password, gender, phoneNumber } = this.formGroup.value;
    
    this.authService.register(firstName,lastName,dateOfBirth,email,email, password,gender,phoneNumber).subscribe(
      data => {
        this.openSnackBar();
        this.isSuccessful = true;
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      });

  }


  openSnackBar() {
    this.snackBar.open(`Înregistrarea a avut loc cu succes!`, 'Închide', {
      duration: 2000,
    });
  }
  

}
