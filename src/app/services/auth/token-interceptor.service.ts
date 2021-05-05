import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private tokenStored: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.tokenStored.getToken();

    if(myToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${myToken}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
