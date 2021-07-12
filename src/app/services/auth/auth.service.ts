import { ISubscription } from './../../models/ISubscription';
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { IUser } from 'src/app/models/IUser';
import { Subject } from 'rxjs';
import { IResetPassword } from '../../models/IResetPasword';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordFormComponent } from '../../components/reset-password-form/reset-password-form.component';
import { ISubscriptionSaverHelper } from '../../models/ISubscriptionSaverHelper';



const PORT_API = '8081';
const AUTH_API = `http://localhost:${PORT_API}/auth/`;
const USER_API = `http://localhost:${PORT_API}/users?email=`;
const GET_ALLUSERS_PATH = `http://localhost:${PORT_API}/users/`;
const SUBSCRIPTION_API = `http://localhost:${PORT_API}/subscriptions/`;







const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new Subject<IUser>();
  private dialogRef!: MatDialogRef<ResetPasswordFormComponent>;
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private snackBar: MatSnackBar, ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(firstName: string, lastName: string, dateOfBirth: Date, email: string, username: string, password: string, gender: string, phoneNumber: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      firstName,
      lastName,  
      dateOfBirth,
      email,
      username,
      password,
      gender,
      phoneNumber
    }, httpOptions);
  }
  updateUser(user: IUser, id: number) : Observable<IUser> {

    let tempUser: IUser = {
      password: user.password,
      email: user.email,
      username: user.username,
      profile: {
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        phoneNumber: user.profile?.phoneNumber,
        address: {
          county: user.profile?.address?.county,
          city: user.profile?.address?.city,
          townShip: user.profile?.address?.townShip,
          village: user.profile?.address?.village,
          street: user.profile?.address?.street,
          gateNumber: user.profile?.address?.gateNumber
        },
        dateOfBirth: user.profile?.dateOfBirth,
        gender: user.profile?.gender,
        age: user.profile?.age,
        personalIdentificationNumber: user.profile?.personalIdentificationNumber
      }
    };
    return this.http.put<IUser>(GET_ALLUSERS_PATH + id, tempUser, httpOptions);
  }

  getAllEmails() : Observable<string[]> {
    return this.http.get<string[]>(GET_ALLUSERS_PATH + 'allEmails', httpOptions);
  }

  getCountUsers() : Observable<number> {
    return this.http.get<number>(GET_ALLUSERS_PATH + 'countUsers', httpOptions);
  }
  
  savePassword(email: string, reset: IResetPassword) : boolean{
    this.http.patch(GET_ALLUSERS_PATH + 'resetPassword?email=' + email + '&password=' , reset , httpOptions).subscribe(data => {
      this.snackBar.open('Parola a fost modificată cu succes.', 'Închide', { 
        duration: 2500
      });

      return true;

    }, err => {
      this.snackBar.open(err.error.message, 'Închide', { 
        duration: 2500
      });
      return false;
    });

    return false;
  }

  sendEmail(email: string)  {
    this.http.patch(GET_ALLUSERS_PATH + 'sendTokenEmail?email=' + email, httpOptions).subscribe(data => {
      this.snackBar.open('Verifică caseta de email.', 'Închide', { 
        duration: 2500
      });
    },err => {
      this.snackBar.open(err.error.message, 'Închide', { 
        duration: 2500
      });
    });
  }

  saveSubscription(userId: number, email: string, dateOfCreation: string, firstName?: string, lastName?: string,banca?: string, expireDate?: string,
           plateNumber?: string, made?: string, model?: string, personalIdentificationNumber?: string, mentions?: string, fullAddress?: string, description?: string) {
    return this.http.post(SUBSCRIPTION_API, { userId, email, dateOfCreation, firstName, lastName, banca, expireDate, plateNumber, made, model, personalIdentificationNumber, mentions, fullAddress, description }, httpOptions)
  }

  
  getSubscription(userId: number) {
    return this.http.get<ISubscription[]>(SUBSCRIPTION_API + userId, httpOptions);
  }

  getSubscriptionBy(subscriptionId: number) {
    return this.http.get<ISubscription>(SUBSCRIPTION_API + 'id?id=' + subscriptionId, httpOptions);
  }

  updateSubscriptionCars(subscriptionId: number, subscription: ISubscriptionSaverHelper) : Observable<ISubscription> {

    return this.http.put<ISubscription>(SUBSCRIPTION_API + subscriptionId, subscription, httpOptions);

  }

  

  getSubscriptionByEmail(email: string) {
    let tempAPI = `${SUBSCRIPTION_API}email?email=${email}`;
    return this.http.get<ISubscription[]>(tempAPI, httpOptions);
  }

  getSubscriptionByDescription(userId: number, description: string) {
    return this.http.get<ISubscription[]>(SUBSCRIPTION_API + userId + '?description=' + description, httpOptions);
  }
  
  getSubscriptions() {
    return this.http.get<ISubscription[]>(SUBSCRIPTION_API, httpOptions);

  }

  removeSubscription(id: number) {
    return this.http.delete(SUBSCRIPTION_API + id);
  }

  delete(id: number) : Observable<any> {
     return this.http.delete(GET_ALLUSERS_PATH + id);
  }

  getRole(email: string) : Observable<string> {
    return this.http.get<string>(GET_ALLUSERS_PATH + 'role?email=' + email, httpOptions);
  }

  getUserRole2(email: string) {
    return this.http.get<string>(GET_ALLUSERS_PATH + 'roleUser?email=' + email, httpOptions);

  }

  setRole(email: string, role: string, asker: string) {
    return this.http.patch(GET_ALLUSERS_PATH + email + '?role=' + role + '&asker=' + asker, httpOptions);
  }

  isLoggedIn(): boolean {
    return this.tokenStorageService.isLoggedIn();
  }

  getToken() : string | null{
    return this.tokenStorageService.getToken();
  }

  signOut() : void {
    this.tokenStorageService.signOut();
  }

  getUserRole() : any {
    return this.tokenStorageService.getUserRole();
  }

  getUsername() : string {
    return this.tokenStorageService.getUsername();
  }

  setUser(user: IUser) {
    this.userSubject.next(user);
  }
  
  clearUser() {
      this.userSubject.next();
  }

  
  getUser(): Observable<IUser> {
      return this.userSubject.asObservable();
  }

  retrieveUser(username: string) : Observable<IUser[]> {
    return this.http.get<IUser[]>(USER_API + username, httpOptions);
  }

  retrieveUsers() : Observable<IUser[]> {
    return this.http.get<IUser[]>(GET_ALLUSERS_PATH, httpOptions);
  }


  isAuthorizedFully() : boolean {
    
    return this.isLoggedIn() && (this.getUserRole() == 'ROLE_ADMIN' || 
                             this.getUserRole() == 'ROLE_MODERATOR' ||
                            this.getUserRole() == 'ROLE_SUPERVISOR' || this.getUserRole() == 'ROLE_HELPER');
  }

}