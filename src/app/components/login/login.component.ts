import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
                private authService:AuthService,
                private route: ActivatedRoute, 
                private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls;}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(user=>{
      this.router.navigate(['messages'], { relativeTo: this.route.parent });
    });
    
    //this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
  }

}
