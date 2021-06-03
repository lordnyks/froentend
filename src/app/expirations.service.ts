import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ExpirationsService {

  public dateNow = this.getRightDate(new Date());
  public date10Later = this.getRightDate(new Date(new Date().setDate(new Date().getDate() + 10)));
  public date3Later = this.getRightDate(new Date(new Date().setDate(new Date().getDate() + 3)));
  public colorA = 'color: red; font-weight: bold;';
  public colorB = 'default';  
  public colorC = 'color: darkgreen; font-weight: bold;';
  public colorD = 'color: orange; font-weight: bold;';
  public colorE = 'color: black;font-weight: bold;';
  
  constructor() { 
      
  }

  public getRightDate(input: Date) : string {
      let year = input.getFullYear();
      let month = input.getMonth() + 1;
      let day = input.getDate();
  
      return `${year}-${this.calculateWithZero(month)}-${this.calculateWithZero(day)}`
    }

  public  calculateWithZero(input: number) : string {
      switch(input) {
        case 1: 
          return '0' + input;
        case 2:
          return '0' + input;
  
        case 3:
          return '0' + input;
        case 4:
          return '0' + input;
  
        case 5:
          return '0' + input;
        case 6:
          return '0' + input;
  
        case 7:
          return '0' + input;
  
        case 8: 
          return '0' + input;
  
        case 9:
          return '0' + input;
        
        default:
          return input.toString();
  
    }
  }
    
}