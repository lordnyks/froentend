import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-option-carteidentitate',
  templateUrl: './option-carteidentitate.component.html',
  styleUrls: ['./option-carteidentitate.component.css']
})
export class OptionCarteidentitateComponent implements OnInit {

  @ViewChild('f') myNgForm: any;
  public formGroup!: FormGroup;

  public nume: string =  '';
  public prenume: string = '';

  constructor(private formBuilder: FormBuilder, private userProfile: UserProfileComponent) {
    this.nume = userProfile.nume;
    this.prenume = userProfile.prenume;
   }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('[a-zA-Z]+')]],
      expireDate: ['', [Validators.required]],      
    });
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      return;
    }
    this.userProfile.onSubmit(this.formGroup);
    this.myNgForm.reset();
  }

}
