import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscription } from 'src/app/models/ISubscription';

@Component({
  selector: 'app-option-rata-la-banca',
  templateUrl: './option-rata-la-banca.component.html',
  styleUrls: ['./option-rata-la-banca.component.css']
})
export class OptionRataLaBancaComponent implements OnInit {
  public formGroup!: FormGroup;
  @ViewChild('f') myNgForm: any;

  public nume: string =  '';
  public prenume: string = '';
  public dialogRef!: MatDialogRef<AcceptDialogComponent>;

  displayedColumns: string[] = ['firstName', 'lastName', 'banca', 'payData', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  
  constructor(private userProfile: UserProfileComponent, private dialog: MatDialog,
    public expirations: ExpirationsService,private authService: AuthService, private formBuilder: FormBuilder) { 
      this.nume = userProfile.nume;
      this.prenume = userProfile.prenume;
    }

  ngOnInit(): void {
    this.refreshUsers();

    this.formGroup = this.formBuilder.group({
      firstName: [this.nume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.prenume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      banca: ['Banca Transilvania', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      expireDate: [new Date(), [Validators.required]],      
    });
  }

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, banca, expireDate} = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(expireDate);
    let myTempString = this.userProfile.dateNow.toLocaleDateString();
    
    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, myTempString, firstName, lastName, banca , myTempDate, undefined, undefined, undefined, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Rata dumneavoastră la bancă a fost salvată cu succes!');
        this.ngOnInit();
        this.myNgForm.reset();
        
      }, 
      err => {
        // this.errorMessage = err.error.message;
        this.userProfile.openSnackBar(err.error.message);
      });

  }


  edit(subscriptionId: number) {
    // this.authService.retrieveUser(input).subscribe(data => {
    //   this.dialogRefEdit = this.dialog.open(UserEditDialogComponent, {
    //     data: data[0]
    //   });
    //   this.dialogRefEdit.afterClosed().subscribe(result => {
    //     this.ngAfterViewInit();
  
    // });
    // });


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
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'rlb').subscribe(
      (data: ISubscription[]) => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }

}
