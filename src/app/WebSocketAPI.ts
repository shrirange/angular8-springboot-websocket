import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    queue: string = "/user/queue/notify";
    user: string = "/queue/chats" + "-" +  "test";
     
    stompClient: any;
    appComponent: AppComponent;
    constructor(appComponent: AppComponent){
        this.appComponent = appComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
             _this.stompClient.subscribe(_this.queue, function (sdkEvent) {
                _this.onPrivateMessageReceived(sdkEvent);
            }); 
            _this.stompClient.subscribe(_this.user, function (sdkEvent) {
                _this.onUserMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    _privatesend(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/privatehello", {}, JSON.stringify(message));
    }

    _usersend(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/userhello", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);
        this.appComponent.handleMessage(JSON.stringify(message.body));
    }

    onPrivateMessageReceived(message) {
        console.log("Private Message Recieved from Server :: " + message);
        this.appComponent.handlePrivateMessage(JSON.stringify(message.body));
    }

    onUserMessageReceived(message) {
        console.log("Private Message Recieved from Server :: " + message);
        this.appComponent.handleUserMessage(JSON.stringify(message.body));
    }
}