import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthService } from '../../services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscription } from '../../models/ISubscription';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { SubscriptionEditDialogComponent } from '../subscription-edit-dialog/subscription-edit-dialog.component';
import { SubscriptionCiEditDialogComponent } from '../subscription-ci-edit-dialog/subscription-ci-edit-dialog.component';


@Component({
  selector: 'app-option-carteidentitate',
  templateUrl: './option-carteidentitate.component.html',
  styleUrls: ['./option-carteidentitate.component.css']
})
export class OptionCarteidentitateComponent implements OnInit {

  displayedColumns: string[] = ['lastName', 'firstName', 'personalIdentificationNumber', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();

  public dialogRef!: MatDialogRef<AcceptDialogComponent>;
  public dialogRefEditSubscription!: MatDialogRef<SubscriptionCiEditDialogComponent>; 
  
  @ViewChild('f') myNgForm: any;
  public formGroup!: FormGroup;

  public nume: string =  '';
  public prenume: string = '';



  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent, private dialog: MatDialog,
     private authService: AuthService, public expirations: ExpirationsService) {
    this.nume = userProfile.nume;
    this.prenume = userProfile.prenume;
   }

  ngOnInit(): void {


    // console.log(this.dateNow);
    // console.log(this.getRightDate());
    this.refreshUsers();
    
    

    this.formGroup = this.formBuilder.group({
      firstName: [this.prenume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.nume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      cnp: [this.userProfile.cnp, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[0-9]+')]],
      expireDate: [new Date(), [Validators.required]],      
    });
  }


  
  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, cnp, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(expireDate);
    let myTempString = this.userProfile.dateNow.toLocaleDateString();
    
    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, myTempString , firstName, lastName, undefined , myTempDate, undefined, undefined, undefined, cnp, undefined, undefined, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Cartea ta de idenitate a fost salvată cu succes!');
        this.ngOnInit();
        this.myNgForm.reset();
        
      }, 
      err => {
        // this.errorMessage = err.error.message;
        this.userProfile.openSnackBar(err.error.message);
      });

  }


  edit(id: number) {


    this.authService.getSubscriptionBy(id).subscribe(data => {
      console.log(id);
      console.log(data);
      this.dialogRefEditSubscription = this.dialog.open(SubscriptionCiEditDialogComponent, {
        data: data
      });

      this.dialogRefEditSubscription.afterClosed().subscribe(result => {
        if(result) {
          this.ngOnInit();
          console.log('yes');
        }
      });
    });
  }

  
  confirm(id: number) {
    
    this.dialogRef = this.dialog.open(AcceptDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Ești sigur că dorești să ștergi acest abonament?`;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.refreshUsers();
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
    this.userProfile.openSnackBar(`Stergerea realizata cu succes`);
  }
  refreshUsers() {
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'ci').subscribe(
      (data: ISubscription[]) => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }



}

