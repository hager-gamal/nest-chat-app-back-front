import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socket} from 'socket.io-client'
import * as Rx from 'rxjs';

import * as io from 'socket.io-client';
import { AuthService } from '../auth/auth.service';

//import * as iio from 'socket.io';
//import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
  // Our socket connection
  private socket=Socket;
  //private ws_url="http://localhost:8080";
  constructor(private userService:AuthService) { }

  connect(): Rx.Subject<MessageEvent> {
  
    //this.socket = new WebSocket('ws://localhost:8080');
    this.socket = io("http://localhost:8080/");
    // We define our observable which will observe any incoming messages
    // from our socket.io server.
   
    let observable = new Observable(observer => {
      
        this.socket.on('msgToClient', (msg:string) => {
          let username =this.userService.userValue._id;
          
          let obj={username,msg};
          console.log("Received message from Websocket Server")

          observer.next(obj);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (message: string) => {        
          let username =this.userService.userValue._id;
          
          let obj={username,message};
          console.log("Received message from Websocket Server")
          this.socket.emit('msgToServer', obj);
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}