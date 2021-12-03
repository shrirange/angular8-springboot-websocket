import { Component } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greeting: string;
  privategreeting: string;
  usergreeting:string;
  name: string;
  privatename: string;
  username: string;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this);
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  sendPrivateMessage(){
    this.webSocketAPI._privatesend(this.privatename);
  }

  sendUserMessage(){
    this.webSocketAPI._usersend(this.username);
  }

  handleMessage(message){
    console.log(message);
    this.greeting = message;
  }

  handlePrivateMessage(privatemessage){
    console.log(privatemessage);
    this.privategreeting = privatemessage;
  }

  handleUserMessage(usermessage){
    console.log(usermessage);
    this.usergreeting = usermessage;
  }
}
