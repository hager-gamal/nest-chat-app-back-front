import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
               private authService:AuthService,
               private route: ActivatedRoute, 
               private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
    //console.log(this.registerForm.controls);
  }

   // convenience getter for easy access to form fields
  get f() { 
    //console.log(this.registerForm.controls);
    return this.registerForm.controls; 
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.registerForm.value);
    
    this.authService.register(this.registerForm.value).subscribe(user=>{
      console.log(user);
      this.router.navigate(['messages'],{ replaceUrl: true ,relativeTo: this.route.parent });
    });
   
  }
}
