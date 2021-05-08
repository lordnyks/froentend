import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-option-rov',
  templateUrl: './option-rov.component.html',
  styleUrls: ['./option-rov.component.css']
})
export class OptionRovComponent implements OnInit {
  @ViewChild('f') form: any;
  
  public formGroup!: FormGroup;

  // private currentDate = new Date();

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]], // B\\s[0-9]{2,3}\\s[A-Z]{3}
      made: ['Mercedes', [Validators.required, Validators.minLength(2), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      model: ['AMG 63', [Validators.required, Validators.minLength(1), Validators.maxLength(32), Validators.pattern('[a-zA-Z0-9\\s]+')]],
      expireDate: [new Date() , [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  onSubmit() { 

    if(this.formGroup.invalid) {
      return;
    }

    this.userProfile.onSubmit(this.formGroup);
    this.form.reset();
  }

}
