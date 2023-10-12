import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Pixel} from "../shared/Models/Pixel";
import {WebSocketService} from "../shared/services/webSocketService";
import {PixelsService} from "../shared/services/pixels.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  // @ts-ignore
  @ViewChild('canvasElement', {static: true}) canvasElement: ElementRef;
  selectedColor: string = '#000000';
  // @ts-ignore
  listPixels;

  async ngAfterViewInit() {
    this.drawCanvas();
    this.listPixels = await lastValueFrom(this.pixelsService.getAllPixel());
    this.addPersistPixel();
    this.webSocketService.ws.addEventListener('message', (message) => {
      console.log('Message recu du serveur: ', message.data);
      this.updatePixelColor(JSON.parse(message.data));
    });
  }

  constructor(private webSocketService: WebSocketService,
              private pixelsService: PixelsService) {
  }

  drawCanvas() {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    ctx.fillStyle = '#ffffff';
    // @ts-ignore
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  changePixelColor(event: MouseEvent) {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    const x = event.offsetX;
    const y = event.offsetY;
    // @ts-ignore
    ctx.fillStyle = this.selectedColor;
    // @ts-ignore
    ctx.fillRect(x, y, 10, 10);
    console.log('Coordonnée x : ' + x + ' coordonnée y: ' + y + ' la couleur' + this.selectedColor);
    const pixel = {
      x: x,
      y: y,
      color: this.selectedColor
    };
    this.webSocketService.sendPixel(pixel);
  }

  updatePixelColor(newPixel: Pixel) {
    console.log('newPixel = ', newPixel.color);
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    ctx.fillStyle = newPixel.color;
    // @ts-ignore
    ctx.fillRect(newPixel.x, newPixel.y, 10, 10);
  }

  addPersistPixel() {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    for (const pixel of this.listPixels) {
      // @ts-ignore
      ctx.fillStyle = pixel[3];
      // @ts-ignore
      ctx.fillRect(pixel[1], pixel[2], 10, 10);
    }
  }
}
