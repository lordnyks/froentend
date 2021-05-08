import { ISubscription } from './../../models/ISubscription';
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { IUser } from 'src/app/models/IUser';
import { Subject } from 'rxjs';


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

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

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
// {
//   "password": "$2a$10$e6EjOazPGWohSUuWaNgJnukAYWyOj9iYBEyjM.0ZtUWk0r.RzJfMa",
//   "email": "lordnyks@gmail.com",
//   "username": "lordnyks@gmail.com",
//   "profile": {
//       "id": 1,
//       "firstName": "Nicusor",
//       "lastName": "Vlads",
//       "phoneNumber": "0755123463",
//       "address": {
//           "county": null,
//           "city": null,
//           "townShip": null,
//           "village": null,
//           "street": null,
//           "gateNumber": null
//       },
//       "dateOfBirth": "1999-12-03T22:00:00.000+00:00",
//       "gender": "masculin",
//       "age": null,
//       "personalIdentificationNumber": null
//   }
// }
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
    



    console.log(tempUser);
    return this.http.put<IUser>(GET_ALLUSERS_PATH + id, tempUser, httpOptions);
  }

  saveSubscription(userId: number, dateOfCreation: Date, firstName: string, lastName: string, expireDate: Date,
           plateNumber: string, made: string, model: string, description: string) {
    return this.http.post(SUBSCRIPTION_API, { userId, dateOfCreation, firstName, lastName, expireDate, plateNumber, made, model, description }, httpOptions)
  }

  getSubscription(userId: number) {
    return this.http.get<ISubscription[]>(SUBSCRIPTION_API + userId, httpOptions);
  }

  delete(id: number) : Observable<any> {
     return this.http.delete(GET_ALLUSERS_PATH + id);
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

}