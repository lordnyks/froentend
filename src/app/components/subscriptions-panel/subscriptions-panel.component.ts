import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-subscriptions-panel',
  templateUrl: './subscriptions-panel.component.html',
  styleUrls: ['./subscriptions-panel.component.css']
})
export class SubscriptionsPanelComponent implements OnInit {
  public flag!: boolean;
  public dialogRef!: MatDialogRef<AcceptDialogComponent>;
  public colorA = 'color: #c49000; font-weight: bold;';
  public colorB = 'default';  
  public myEmail!: string;

  displayedColumns: string[] = ['email', 'plateNumber', 'made', 'model', 'description', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  constructor(private authService: AuthService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit(): void {

    

    this.myEmail = this.authService.getUsername();
    this.authService.getSubscriptions().subscribe(
      data =>  {
        
        this.dataSource = new MatTableDataSource(data);
      });
      
  }

  confirm(id: number) {
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
        this.openSnackBar('Stergerea a fost efectuata cu succes!');
        this.ngOnInit();
      },
      err => {
        this.openSnackBar('Stergerea a eșuat!');

      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2000,
    });
  }

}
