import { Injectable } from '@angular/core';
import { Image } from '../models/image.model';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class NavParamsService {
  private _obstacle: string;
  private _image: string;
  private _location: Location;

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

  set location(i: Location) {
    this._location = i;
  }
  get location(): Location {
    return this._location;
  }
}
