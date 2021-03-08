import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from 'src/app/enviroment';
import { map } from 'rxjs/operators';

import { Message } from '../../models/message';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url="";
  constructor( private router: Router,
    private http: HttpClient) { 
      this.url=enviroment._apiUrl;
    }
  
  getMessages(){
    return this.http.get<any>(this.url)
      .pipe(
          map(
            (messages:Message[])=> {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            //user.authdata = window.btoa(username + ':' + password);
            return messages;
      }));
  }
}
