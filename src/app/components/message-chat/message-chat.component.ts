import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat/chat.service';
import { Message  } from '../../models';
import { faPaperPlane , faGrinAlt} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services';
@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.css']
})
export class MessageChatComponent implements OnInit {
  
  messages:Message[]=new Array<Message>();
  emojisList:string[];
  enableEmojis:boolean;
  messageInput:string;
  fapaperplane=faPaperPlane;
  fagrinalt=faGrinAlt;

  constructor(private chat: ChatService,
    private messageService:MessageService){ }

  ngOnInit() {
    
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg); 
      console.log(msg);
    })
    
   //this.emojisList = emojiList;
   //console.log(this.emojisList);
   
   this.messageService.getMessages().subscribe((retMessages:Message[])=>{
           
        for(let i=0;i<100;++i){
        if(!retMessages[i])break;

          let m=new Message();
          this.messages.push(m); 
          this.messages[i].messageText =retMessages[i].messageText;
          console.log(retMessages[i]);
        }
        console.log(this.messages);
  });
   
   this.enableEmojis=false;
  //  this.messages=[
  //     {
  //       date:new Date(Date.now()).toString(),
  //       roomName:"public",
  //       text:"hello",
  //       user_id:"ahmed"
  //     },
  //     {
  //       date:new Date(Date.now()).toString(),
  //       roomName:"public",
  //       text:"hello here",
  //       user_id:"amgad"
  //     },
  //     {
  //       date:new Date(Date.now()).toString(),
  //       roomName:"public",
  //       text:"welcome",
  //       user_id:"hossam"
  //     }

  //   ];
  }

  fillEmojiList(){
    if(this.enableEmojis){
      this.enableEmojis=false;
    }
    else {
      this.enableEmojis=true;
    }
  }

  addEmoji(emo){
    let value= emo.emoji.native;
    if(this.messageInput){
        this.messageInput+=value;
      }
      else {
        this.messageInput=value;
      }
  } 

  sendMessage() {
    console.log(this.messageInput);
    if(this.messageInput){
      let message:Message=new Message();
      message.messageText=this.messageInput;
      message.user_id="a";
      this.messages.push(message);
      this.chat.sendMsg(this.messageInput);
      this.messageInput="";
    }
    
  }
}
