import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public loginForm!: FormGroup;
  public errorMessage = '';
  public user!: IUser;
  


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, private component: AppComponent, private navBar: NavbarComponent, private dialog: MatDialog ) {

    this.loginForm = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
      })
   }

  ngOnInit(): void {

  }


  forgotPassword() {
    this.dialog.open(ResetPasswordComponent);
  }
  onSubmit() : void  {

    if(this.loginForm.invalid) {
      return;
    }

    const {username, password} = this.loginForm.value;

    this.authService.login(username,password).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.authService.retrieveUser(username).subscribe(result => {
        this.authService.setUser(result[0]);
        this.user = result[0];
        this.snackBar.open(`Bine ai venit, ${this.user?.profile?.firstName} ${this.user?.profile?.lastName}!`, 'Închide', { duration: 2500 } );
        this.component.title = `${this.user?.profile?.firstName} ${this.user?.profile?.lastName}`;
        
        // this.openSnackBar();
        this.navBar.ngOnInit();
        this.router.navigate(['home']);
      });

    }, err => {
      this.errorMessage = err.error.message;
    });


  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.authService.signOut();
  }


  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'Închide', {
      duration: time,
    });
  }
}



