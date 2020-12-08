import { Component, OnInit } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-set-global-position',
  templateUrl: './set-global-position.page.html',
  styleUrls: ['./set-global-position.page.scss'],
})
export class SetGlobalPositionPage implements OnInit {
  private location = new Location();

  constructor() {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    await this.autoLocate();
  }

  /**
   * Will locate the user with high accuracy
   */
  private async autoLocate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.error('error GPS');
      return;
    }

    // For more information about the options:
    // https://github.com/apache/cordova-plugin-geolocation#geolocationoptions
    const position = await Plugins.Geolocation.getCurrentPosition({
      maximumAge: 1000,
      timeout: 5000,
      enableHighAccuracy: true,
    });

    this.location.lat = position.coords.latitude;
    this.location.lng = position.coords.longitude;
  }
}
