import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models';
import { enviroment } from '../../enviroment/index';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private url:string;

  constructor(
    private router: Router,
    private http: HttpClient){
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('user')));
        
        this.user = this.userSubject.asObservable();
        this.url=enviroment._apiUrl;
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  register(user:User){
    this.url=`${enviroment._apiUrl}/auth/register`;
    
    return this.http.post<User>(this.url, user)
      .pipe(
          map((user:User)=> {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            //user.authdata = window.btoa(username + ':' + password);
            user.password="";
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
      }));
  }

  login(user:User) {
    this.url=`${enviroment._apiUrl}/auth/login`;
    return this.http.post<User>(this.url, user)
        .pipe(
            map((user:User)=> {
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              //user.authdata = window.btoa(username + ':' + password);
              user.password="";
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
        }));
  }

  logOut(){
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
