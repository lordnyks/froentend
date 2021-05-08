import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-option-rca',
  templateUrl: './option-rca.component.html',
  styleUrls: ['./option-rca.component.css']
})
export class OptionRcaComponent implements OnInit {
  @ViewChild('f') form: any;

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userProfileComponent: UserProfileComponent) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      plateNumber: ['AG 22 YNM', [Validators.required, Validators.pattern('^[AB|AR|AG|BC|BH|BN|BT|BV|BR|BZ|CS|CJ|CL|CT|CV|DB|DJ|GL|GR|GJ|HR|HD|IS|IL|MM|MH|MS|NT|OT|PH|SM|SJ|SB|TR|TM|TL|VS|VN|B]{1,2}\\s[0-9]{2,3}\\s[A-Z]{3}$')]],
      made: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      model: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(32), Validators.pattern('[a-zA-Z0-9]+')]],
      expireDate: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],      
    });
  }

  onSubmit() {
    console.log(this.formGroup.errors);
    if(this.formGroup.invalid) {
      return;
    }
    this.userProfileComponent.onSubmit(this.formGroup);
    this.form.reset();
  }

}
