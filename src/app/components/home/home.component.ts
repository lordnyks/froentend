import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public expireAlert: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {

  }



}
