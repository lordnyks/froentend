import { Component, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { state, style, trigger } from '@angular/animations';
import { ThemeService } from 'ng2-charts';
import { ValidationFieldsService } from '../../services/validation-fields.service';


@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css'],
  // animations: [
  //   trigger('divState', [
  //     state('normal', style({
  //       'backgroud-color': 'red',
  //       transofrm: 'translateX(0)'
  //     })),
  //     state('highlighted', style({
        
  //     }))
  //   ])
  // ]
})
export class UsersPanelComponent implements AfterViewInit {
  public state = 'normal';
  public formControl = new FormControl();
  public displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName','phoneNumber', 'role', 'editUser'];
  public dataSource = new MatTableDataSource<IUser>();
  public dialogRef!: MatDialogRef<AcceptDialogComponent>;
  public dialogRefEdit!: MatDialogRef<UserEditDialogComponent>;



  
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog, public validations: ValidationFieldsService) {
    this.validations.userRole = this.authService.getUserRole();
    this.validations.canEdit = this.validations.userRole == 'ROLE_ADMIN' ? true : this.validations.userRole == 'ROLE_SUPERVISOR' ? true : this.validations.userRole == 'ROLE_MODERATOR' ? true : this.validations.userRole == 'ROLE_HELPER' ? true : false;
    this.validations.canDelete = this.validations.userRole == 'ROLE_ADMIN' ? true : false;
    this.validations.canSeePhone = this.validations.userRole == 'ROLE_ADMIN' ? true : this.validations.userRole == 'ROLE_SUPERVISOR' ? true : false;
  }


  
  ngAfterViewInit() {

    this.authService.retrieveUsers().subscribe(result => {
     this.dataSource = new MatTableDataSource(result);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     this.translateMatPaginator(this.paginator);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = '';
    paginator._intl.itemsPerPageLabel = 'Pagina: ';
    paginator._intl.lastPageLabel = 'Ultima pagină';
    paginator._intl.nextPageLabel = 'Pagina următoare';
    paginator._intl.previousPageLabel = 'Pagina precedentă';
  }

  editare(input: string) {

    this.authService.retrieveUser(input).subscribe(data => {
      this.dialogRefEdit = this.dialog.open(UserEditDialogComponent, {
        data: data[0]
      });
      this.dialogRefEdit.afterClosed().subscribe(result => {
        this.ngAfterViewInit();
  
    });
    });
    
  }

  public stergere(id: string, email: string, role: string) : void {
    
    if(role == 'ROLE_ADMIN') {
      this.message('Nu ai acces pentru a sterge acest utilizator!'); 
      return;
    }

    const result = parseInt(id);
    this.authService.delete(result).subscribe(() => {
      this.refresh();
      const message = `"${email}", a fost sters cu succes!`;
      this.message(message);
    });
  }

  confirm(id: string, email: string, role: string) {
    this.dialogRef = this.dialog.open(AcceptDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = `Ești sigur că dorești să ștergi acest user? (${email})`;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.stergere(id, email, role);
      }

    });
  }
  public message(message: string) {
    this.snackBar.open(message, 'Închide', {
      duration: 2500,
    });
  }
  public refresh() {
    this.authService.retrieveUsers().subscribe((data: IUser[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  public interpretare(role: string) : string {
    switch(role) {
      case 'ROLE_ADMIN':
        return 'Administrator';
      case 'ROLE_SUPERVISOR':
        return "Supervisor";
      case 'ROLE_MODERATOR':
        return "Moderator";
      case 'ROLE_HELPER':
        return "Helper";
      
      default:
        return 'Membru';

    }
  }
}
