import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/IUser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISubscriptionHelper } from '../models/ISubscriptionHelper';

const PORT_API = '8081';
const PATH_INFO_USERS =  `http://localhost:${PORT_API}/users/`;
const GENDERS_PATH = `http://localhost:${PORT_API}/users/countGenders`;
const CATEGORIES_PATH =`http://localhost:${PORT_API}/subscriptions/categories`;
const ROLES_PATH = `http://localhost:${PORT_API}/users/countRoles`;
const MADES = `http://localhost:${PORT_API}/subscriptions/countAllMades`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserDetailsService{

  public user!: IUser;  
  private userSubject$ = new BehaviorSubject<IUser>({});

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.retrieveUser(this.authService.getUsername()).subscribe(data => this.userSubject$.next(data[0]));
    
    this.userSubject$.asObservable().subscribe(data => this.user = data);
  
  }


  public getNumberOfUsers() {
    return this.http.get<number>(PATH_INFO_USERS + 'countUsers', httpOptions);
  }

  public getGenders() {
    return this.http.get<number[]>(GENDERS_PATH, httpOptions);
  }


  public getCategories() {
    return this.http.get<number[]>(CATEGORIES_PATH, httpOptions);
  }

  public getRoles() {
    return this.http.get<number[]>(ROLES_PATH, httpOptions);
  }

  public getAllMades() {
    return this.http.get<ISubscriptionHelper[]>(MADES, httpOptions);
  }

}
