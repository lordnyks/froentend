import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  
  constructor(private infoService: UserDetailsService) {

  }

  ngOnInit(): void {

  }



}
