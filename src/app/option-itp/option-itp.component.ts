import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-option-itp',
  templateUrl: './option-itp.component.html',
  styleUrls: ['./option-itp.component.css']
})
export class OptionItpComponent implements OnInit {
  public formGroup!: FormGroup;
  @ViewChild('f') myNgForm: any;

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]],
      made: ['', [Validators.required, Validators.minLength(2),, Validators.pattern('[a-zA-Z]+')]],
      model: ['', [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z0-9]+')]],
      expireDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  onSubmit() { 

    if(this.formGroup.invalid) {
      return;
    }
    this.userProfile.onSubmit(this.formGroup);
    this.reset();

  }

  reset() {
    this.myNgForm.resetForm();
  }
}
