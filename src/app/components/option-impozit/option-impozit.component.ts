import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExpirationsService } from 'src/app/services/expirations.service';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SubscriptionImpozitEditDialogComponent } from '../subscription-impozit-edit-dialog/subscription-impozit-edit-dialog.component';

@Component({
  selector: 'app-option-impozit',
  templateUrl: './option-impozit.component.html',
  styleUrls: ['./option-impozit.component.css']
})
export class OptionImpozitComponent implements OnInit {

  public formGroup!: FormGroup;
  @ViewChild('f') myNgForm: any;

  public nume: string =  '';
  public prenume: string = '';
  public adresaUser: string = '';

  public dialogRef!: MatDialogRef<AcceptDialogComponent>;
  public dialogRefEditSubscription!: MatDialogRef<SubscriptionImpozitEditDialogComponent>;

  displayedColumns: string[] = ['lastName', 'firstName', 'payData', 'mentions', 'fullAddress', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  
  constructor(private userProfile: UserProfileComponent, private dialog: MatDialog,
    public expirations: ExpirationsService,private authService: AuthService, private formBuilder: FormBuilder) { 
      this.nume = userProfile.nume;
      this.prenume = userProfile.prenume;

      this.adresaUser = `Județ: ${userProfile.county}, Oraș: ${userProfile.city}, Localitatea: ${userProfile.townShip}, Strada: ${userProfile.street}, Nr: ${userProfile.gateNumber}.`;


    }

  ngOnInit(): void {
    this.refreshUsers();

    this.formGroup = this.formBuilder.group({
      firstName: [this.prenume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: [this.nume, [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      mentions: ['Impozit apartament', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      fullAddress: [this.adresaUser, [Validators.required]],
      expireDate: [new Date(), [Validators.required]],     
    });
  }

  onSubmit() {

    if(this.formGroup.invalid) {
      return;
    }

    const { firstName, lastName, mentions, fullAddress, expireDate } = this.formGroup.value;

    let myTempDate = this.expirations.getRightDate(new Date(expireDate));
    let myTempString = this.userProfile.dateNow.toLocaleDateString();
    

    this.authService.saveSubscription(this.userProfile.userId, this.userProfile.email, myTempString , firstName, lastName, undefined, myTempDate, undefined,undefined, undefined, undefined, mentions, fullAddress, this.userProfile.selected).subscribe( 
      data => {
        this.userProfile.openSnackBar('Impozitul tău a fost adăugat cu succes!');
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
      this.dialogRefEditSubscription = this.dialog.open(SubscriptionImpozitEditDialogComponent, {
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
    this.authService.getSubscriptionByDescription(this.userProfile.userId, 'impozit').subscribe(
      (data: ISubscription[]) => {
        this.dataSource = new MatTableDataSource(data);
      } );
  }


}
