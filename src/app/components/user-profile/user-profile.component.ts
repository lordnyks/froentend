import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { IUser } from 'src/app/models/IUser';



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
  public email!: string;
  public dataNasterii!: Date;
  public errorMessage: string = '';
  public county: string = '';
  public city: string = '';
  public townShip = '';
  public village = '';
  public street = '';
  public gateNumber = '';
  public gender = '';
  public cnp = '';
  
  public updateUserDetailsForm!: FormGroup;
  public dialogRef!: MatDialogRef<AcceptDialogComponent>;

  
  displayedColumns: string[] = ['plateNumber', 'made', 'model', 'description', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();


  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService,
    private snackBar: MatSnackBar, public dialog: MatDialog, private navBar: NavbarComponent) {}
  

  ngOnInit() : void {
        
    this.authService.retrieveUser(this.authService.getUsername()).subscribe(
        data => {
          this.myUser = data[0];
          this.userId = this.myUser.id!; 
          this.prenume = this.myUser.profile?.firstName! === null ? 'nedefinit' : this.myUser.profile?.firstName!;
          this.nume = this.myUser.profile?.lastName  === null ? 'nedefinit' : this.myUser.profile?.lastName!;
          this.telefon = this.myUser.profile?.phoneNumber === null ? 'nedefinit' : this.myUser.profile?.phoneNumber!;
          this.dataNasterii = this.myUser.profile?.dateOfBirth! === null ? new Date("01/01/100") : this.myUser.profile?.dateOfBirth!;
          this.email = this.myUser.email === null ? 'nedefinit' : this.myUser.email!;
          this.county = this.myUser.profile?.address?.county === null ? 'nesetat' : this.myUser.profile?.address?.county!;
          this.city = this.myUser.profile?.address?.city === null ? 'nesetat' : this.myUser.profile?.address?.city!;
          this.townShip = this.myUser.profile?.address?.townShip === null ? 'nesetat' : this.myUser.profile?.address?.townShip!;
          this.village = this.myUser.profile?.address?.village === null ? 'nesetat' : this.myUser.profile?.address?.village!;
          this.street = this.myUser.profile?.address?.street === null ? 'nesetat' : this.myUser.profile?.address?.street!;
          this.gateNumber = this.myUser.profile?.address?.gateNumber === null ? 'nesetat' : this.myUser.profile?.address?.gateNumber!;
          this.gender = this.myUser.profile?.gender === null ? 'nesetat' : this.myUser.profile?.gender!;
          this.cnp = this.myUser.profile?.personalIdentificationNumber === null ? 'nesetat' : this.myUser.profile?.personalIdentificationNumber!;

          this.updateUserDetailsForm = this.formBuilder.group({
            firstName: [
              this.prenume,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(32),
                Validators.pattern('[a-zA-Z]+'),
              ],
            ],
            lastName: [ this.nume,[Validators.required,Validators.minLength(3),Validators.maxLength(32),Validators.pattern('[a-zA-Z]+'),],],
            phoneNumber: [this.telefon,[Validators.required,Validators.minLength(1), Validators.maxLength(32), ],],
            county: [this.county, [Validators.required, Validators.minLength(3)]],
            dateOfBirth: [this.dataNasterii, [Validators.required]],
            city: [this.city,[Validators.required, Validators.minLength(3)]],
            townShip: [this.townShip, [Validators.required]],
            village: [this.village, [Validators.required]],
            street: [this.street,[Validators.required]],
            gateNumber: [this.gateNumber, [Validators.required]],
            gender: [this.gender, [Validators.required]],
            cnp: [this.cnp, [Validators.required]]
          });
          
          // console.log(data[0]);
          this.authService.getSubscription(this.userId).subscribe(
            data =>  {
              this.dataSource = new MatTableDataSource(data);
            }
          );
        }
        );
    
    this.activatedRoute.data.subscribe(
        data => { 
            this.myUser = data.user[0];
            this.userId = this.myUser.id!; 
            this.prenume = this.myUser.profile?.firstName! === null ? 'nedefinit' : this.myUser.profile?.firstName!;
            this.nume = this.myUser.profile?.lastName  === null ? 'nedefinit' : this.myUser.profile?.lastName!;
            this.telefon = this.myUser.profile?.phoneNumber === null ? 'nedefinit' : this.myUser.profile?.phoneNumber!;
            this.dataNasterii = this.myUser.profile?.dateOfBirth! === null ? new Date("01/01/100") : this.myUser.profile?.dateOfBirth!;
            this.email = this.myUser.email === null ? 'nedefinit' : this.myUser.email!;
            this.county = this.myUser.profile?.address?.county === null ? 'nesetat' : this.myUser.profile?.address?.county!;
            this.city = this.myUser.profile?.address?.city === null ? 'nesetat' : this.myUser.profile?.address?.city!;
            this.townShip = this.myUser.profile?.address?.townShip === null ? 'nesetat' : this.myUser.profile?.address?.townShip!;
            this.village = this.myUser.profile?.address?.village === null ? 'nesetat' : this.myUser.profile?.address?.village!;
            this.street = this.myUser.profile?.address?.street === null ? 'nesetat' : this.myUser.profile?.address?.street!;
            this.gateNumber = this.myUser.profile?.address?.gateNumber === null ? 'nesetat' : this.myUser.profile?.address?.gateNumber!;
            this.gender = this.myUser.profile?.gender === null ? 'nesetat' : this.myUser.profile?.gender!;
            this.cnp = this.myUser.profile?.personalIdentificationNumber === null ? 'nesetat' : this.myUser.profile?.personalIdentificationNumber!;
            // console.log(data.user[0]);
            this.updateUserDetailsForm = this.formBuilder.group({
              firstName: [this.prenume, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+') ]],
              lastName: [this.nume, [Validators.required, Validators.minLength(3), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
              phoneNumber: [this.telefon, [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
              dateOfBirth: [this.dataNasterii, [Validators.required]],
              county: [this.county, [Validators.required, Validators.minLength(3)]],
              city: [this.city,[Validators.required, Validators.minLength(3)]],
              townShip: [this.townShip, [Validators.required]],
              village: [this.village, [Validators.required]],
              street: [this.street,[Validators.required]],
              gateNumber: [this.gateNumber, [Validators.required]],
              gender: [this.gender, [Validators.required]],
              cnp: [this.cnp, [Validators.required]],
            });
          }
          
        );
        
        this.authService.getSubscription(this.userId).subscribe(
            data =>  {
                this.dataSource = new MatTableDataSource(data);
              });
  }

  public onSubmit(input: FormGroup) : void {

    // if(this.formGroup.invalid) {
    //   return;
    // }


    const { firstName, lastName, plateNumber, made, model, expireDate } = input.value;

    
    let myTempString = this.dateNow.toLocaleDateString();

    this.authService.saveSubscription(this.userId, this.email, myTempString, firstName, lastName, expireDate, plateNumber, made, model, this.selected).subscribe( 
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
        
      }, 
      err => {
        this.errorMessage = err.error.message;
        this.openSnackBar(`Salvarea a esuat!`);
      });
  }
  
  updateUserDetails() {

    const {firstName, lastName, phoneNumber, dateOfBirth, county, city, townShip,
          village, street, gateNumber, gender, cnp} = this.updateUserDetailsForm.value;
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
          village: village,
          street: street,
          gateNumber: gateNumber
        },
        dateOfBirth: dateOfBirth,
        gender: gender,
        age: this.myUser.profile?.age,
        personalIdentificationNumber: cnp
      }
    };
    this.authService.updateUser(tempUser, this.userId).subscribe(
      data => {
        this.openSnackBar('Salvarea a avut loc cu succes!');
        this.ngOnInit();
        this.navBar.ngOnInit();

      }, 
      err => {
        this.openSnackBar('Salvarea a esuat!');
        this.ngOnInit();
        this.errorMessage = err.error.message;
      }
    );
    
  }


  confirm(id: number){
    this.dialogRef = this.dialog.open(AcceptDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Ești sigur că dorești să ștergi acest abonament?`;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove(id);

      }

    });

  }

  remove(id: number) {
    this.authService.removeSubscription(id).subscribe(
      data => {
        this.openSnackBar('Ștergerea a fost efectuată cu succes!');
        this.ngOnInit();
      },
      err => {
        this.openSnackBar('Ștergerea a eșuat!');
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }



}
