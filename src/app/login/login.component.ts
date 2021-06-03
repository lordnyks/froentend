import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { IUser } from '../models/IUser';

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
    private snackBar: MatSnackBar) {

    this.loginForm = formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
      })
   }

  ngOnInit(): void {

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
        
        
        // this.openSnackBar();
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



