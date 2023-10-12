import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PixelsService {

  constructor(private http: HttpClient) {
  }

  public getAllPixel(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>("http://localhost:8080/pixels");
  }

}
