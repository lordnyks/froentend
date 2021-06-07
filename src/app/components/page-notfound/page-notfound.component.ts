import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent implements OnInit {

  constructor(private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.snackBar.open('Această pagină nu există!', 'Închide', {duration: 2500, verticalPosition: 'top', horizontalPosition: 'center'});
      this.router.navigate(['home']);
  }
}
