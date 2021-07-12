import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { ISubscription } from 'src/app/models/ISubscription';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersStatisticsComponent } from '../users-statistics/users-statistics.component';
import { UserDetailsService } from '../../services/user-details.service';

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


  displayedColumns: string[] = ['email', 'plateNumber', 'made', 'model', 'description', 'banca', 'expireDate', 'actions'];
  public dataSource = new MatTableDataSource<ISubscription>();
  constructor(private authService: AuthService, private snackBar: MatSnackBar,private dialog: MatDialog, private userStatistics: UsersStatisticsComponent) { }

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
        this.userStatistics.getMadesObservable();
        // this.detailsService.getAllMades().subscribe(data => this.madesCount$.next(data));

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
