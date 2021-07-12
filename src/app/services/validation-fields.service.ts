import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationFieldsService implements OnInit {

  public userRole: string;
  public canEdit: boolean;
  public canDelete: boolean;
  public canSeePhone: boolean;



  public patternForPlateNumber = '(^(AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN){1}\\s[0-9]{2}\\s[A-Z]{3}$)|(^B\\s[0-9]{2,3}\\s[A-Z]{3}$)';
  public patternForCNP = '^[1-9]\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])(0[1-9]|[1-4]\\d|5[0-2]|99)(00[1-9]|0[1-9]\\d|[1-9]\\d\\d)\\d$';
  public patternForNumber = '^(\\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\\s|\\.|\\-)?([0-9]{3}(\\s|\\.|\\-|)){2}$';

  constructor(private authService: AuthService) { 
    this.userRole = this.authService.getUserRole();
    this.canEdit = this.userRole == 'ROLE_ADMIN' ? true : this.userRole == 'ROLE_SUPERVISOR' ? true : this.userRole == 'ROLE_MODERATOR' ? true : this.userRole == 'ROLE_HELPER' ? true : false;
    this.canDelete = this.userRole == 'ROLE_ADMIN' ? true : false;
    this.canSeePhone = this.userRole == 'ROLE_ADMIN' ? true : this.userRole == 'ROLE_SUPERVISOR' ? true : false;
  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.canEdit = this.userRole == 'ROLE_ADMIN' ? true : this.userRole == 'ROLE_SUPERVISOR' ? true : this.userRole == 'ROLE_MODERATOR' ? true : this.userRole == 'ROLE_HELPER' ? true : false;
    this.canDelete = this.userRole == 'ROLE_ADMIN' ? true : false;
    this.canSeePhone = this.userRole == 'ROLE_ADMIN' ? true : this.userRole == 'ROLE_SUPERVISOR' ? true : false;
  }
}
