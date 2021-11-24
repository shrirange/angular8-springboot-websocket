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
  name: string;
  privatename: string;
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

  handleMessage(message){
    console.log(message);
    this.greeting = message;
  }

  handlePrivateMessage(privatemessage){
    console.log(privatemessage);
    this.privategreeting = privatemessage;
  }
}
