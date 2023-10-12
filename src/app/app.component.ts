import {Component} from '@angular/core';
import {WebSocketService} from "./shared/services/webSocketService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.initWebSocket();
  }
}
