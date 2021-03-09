import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent implements OnInit {

  constructor( private route: ActivatedRoute, 
               private router: Router) { }

  ngOnInit(): void {
  }
  
  onSignUp(){
    this.router.navigate(['register'], { relativeTo: this.route });
  }

  onLogin(){
    this.router.navigate(['login'], { relativeTo: this.route });
  }
}
