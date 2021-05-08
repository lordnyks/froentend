import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { iif } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor(private cookie: CookieService) {
    }

    signOut(): void {
        this.cookie.deleteAll();
        // window.localStorage.clear();
    }

    public saveToken(token: string): void {
        this.cookie.delete(TOKEN_KEY);
        this.cookie.set(TOKEN_KEY, token);
        // window.localStorage.removeItem(TOKEN_KEY);
        // window.localStorage.setItem(TOKEN_KEY,
        //     token);
    }

    public getToken(): string | null {
        return this.cookie.get(TOKEN_KEY);
        // return window.localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        this.cookie.delete(USER_KEY);
        this.cookie.set(USER_KEY, JSON.stringify(user));
        // window.localStorage.removeItem(USER_KEY);
        // window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUsername(): string {
        const user = this.cookie.get(USER_KEY);

        if (user) {
            return JSON.parse(user).username;
        }

        return "";
        // const user = window.localStorage.getItem(USER_KEY);
        // if ( user ) {
        //     return JSON.parse(user).username;
        // }

        // return "";
    }

    public isLoggedIn(): boolean {

        const user = this.cookie.get(USER_KEY);
        if(user) {
            return true;
        }

        return false;
        // const user = window.localStorage.getItem(USER_KEY);
        // if ( user ) {
        //     return true;
        // }
        // return false;
    }
    public getUserRole(): any {
        const user = this.cookie.get(USER_KEY);

        if( user ) {
            return JSON.parse(user).roles[0];
        }
        // const user = window.localStorage.getItem(USER_KEY);
        // if ( user ) {
        //     return JSON.parse(user).roles[0];
        // }
    }
}