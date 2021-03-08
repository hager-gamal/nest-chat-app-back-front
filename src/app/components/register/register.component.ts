import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
    console.log(this.registerForm.controls);
  }

   // convenience getter for easy access to form fields
  get f() { 
    console.log(this.registerForm.controls);
    return this.registerForm.controls; 
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.profileForm.value);
  }
}
