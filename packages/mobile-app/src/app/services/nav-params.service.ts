import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class NavParamsService {
  private _obstacle: string;
  private _image: string;

  set obstacle(o: string) {
    this._obstacle = o;
  }
  get obstacle(): string {
    return this._obstacle;
  }

  set image(i: string) {
    this._image = i;
  }
  get image(): string {
    return this._image;
  }
}
