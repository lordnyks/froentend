import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../models/IUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubscription } from '../models/ISubscription';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('f') myNgForm: any;

  reset() {
    this.myNgForm.reset();
  }
  testDate = new Date();
  

  public myUser!: IUser;
  public subscriptions!: ISubscription[];

  public selected = 'niciuna';
  public userId!: number;
  public nume!: string;
  public prenume!: string;
  public telefon!: string;
  public dataNasterii!: Date;
  public errorMessage: string = '';
  public formGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService,
    private snackBar: MatSnackBar) {}


  ngOnInit() : void {
         
  

    this.activatedRoute.data.subscribe(
      data => { 
        this.myUser = data.user[0];
        this.userId = this.myUser.id!; 
        this.prenume = this.myUser.profile?.firstName! === null ? 'nedefinit' : this.myUser.profile?.firstName!;
        this.nume = this.myUser.profile?.lastName  === null ? 'nedefinit' : this.myUser.profile?.lastName!;
        this.telefon = this.myUser.profile?.phoneNumber === null ? 'nedefinit' : this.myUser.profile?.phoneNumber!;
        this.dataNasterii = this.myUser.profile?.dateOfBirth! === null ? new Date("01/01/100") : this.myUser.profile?.dateOfBirth!;
      }
    );

    this.authService.getSubscription(this.userId).subscribe(
      data =>  {
        this.subscriptions = data;

      }
    );
    
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      plateNumber: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      made: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      model: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      expireDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  public onSubmit() : void {

    // if(this.formGroup.invalid) {
    //   return;
    // }


    const { firstName, lastName, plateNumber, made, model, expireDate } = this.formGroup.value;

    this.authService.saveSubscription(this.userId, this.testDate, firstName, lastName, expireDate, plateNumber, made, model, this.selected).subscribe( 
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        this.test();
      }, 
      err => {
        this.openSnackBar('Salvarea a esuat!');
        this.errorMessage = err.error.message;
      });
  }
  
  test() {

    this.reset();
    this.formGroup.controls['firstName'].setErrors(null);
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }

}
