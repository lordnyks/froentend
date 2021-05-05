import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css']
})
export class AcceptDialogComponent implements OnInit {

  public hasAccepted: boolean;

  constructor(public dialog: MatDialog) {
    this.hasAccepted = false;
   }

  ngOnInit(): void {
  }

}
