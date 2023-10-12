import {Injectable} from '@angular/core';
import {Pixel} from "../Models/Pixel";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // @ts-ignore
  ws: WebSocket;


  constructor() {
  }

  initWebSocket() {
    this.ws = new WebSocket('ws://localhost:8080/ws');
  }

  sendPixel(newPixel: Pixel) {
    this.ws.send(JSON.stringify(newPixel));
  }
}
