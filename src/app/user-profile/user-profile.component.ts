import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../models/IUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISubscription } from '../models/ISubscription';
import { MatTableDataSource } from '@angular/material/table';


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

  dateNow = new Date();
  

  public myUser!: IUser;
  
  public selected = 'niciuna';
  public userId!: number;
  public nume!: string;
  public prenume!: string;
  public telefon!: string;
  public dataNasterii!: Date;
  public errorMessage: string = '';
  public formGroup!: FormGroup;
  
  displayedColumns: string[] = ['plateNumber', 'made', 'model', 'description', 'expireDate'];
  public dataSource = new MatTableDataSource<ISubscription>();


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
        console.log(data.user[0]);

      }
    );

    this.authService.getSubscription(this.userId).subscribe(
      data =>  {
        this.dataSource = new MatTableDataSource(data);
      }
    );
    

  }



  public onSubmit(input: FormGroup) : void {

    // if(this.formGroup.invalid) {
    //   return;
    // }


    const { plateNumber, made, model, expireDate } = input.value;


    this.authService.saveSubscription(this.userId, this.dateNow, this.prenume, this.nume, expireDate, plateNumber, made, model, this.selected).subscribe( 
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
      }, 
      err => {
        this.openSnackBar('Salvarea a esuat!');
        this.errorMessage = err.error.message;
      });
  }
  
  test() {
    this.authService.updateUser(this.myUser, this.userId).subscribe(
      data => {
        
        this.openSnackBar('Salvarea a avut loc cu succes!');
      }, 
      err => {
        this.openSnackBar('Salvarea a esuat!');
        this.errorMessage = err.error.message;
      }
    );
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }

}
