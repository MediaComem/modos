import { Component, OnInit } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { Location } from '../../models/location.model';
import { Map, tileLayer, marker, LayerGroup, Control } from 'leaflet';
import { AlertController, LoadingController } from '@ionic/angular';

// resolve bug with leaflet not loading the icon
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import { Router } from '@angular/router';
import { NavParamsService } from 'src/app/services/nav-params.service';

const DEFAULT_MAP_ZOOM = 18;

// following position is ~Yverdon-Les-Bains
const DEFAULT_LAT = 46.7785;
const DEFAULT_LNG = 6.6412;

@Component({
  selector: 'app-set-global-position',
  templateUrl: './set-global-position.page.html',
  styleUrls: ['./set-global-position.page.scss'],
})
export class SetGlobalPositionPage implements OnInit {
  public map: Map;
  public markerPosition: any;
  public location = new Location();

  constructor(
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    private param: NavParamsService,
    private router: Router
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    // init map and base coordinate
    this.location.lat = DEFAULT_LAT;
    this.location.lng = DEFAULT_LNG;
    this.loadLeafletMap();

    await this.refreshMapPosition();
  }

  private showErrorLocalisationAlert() {
    this.alertCtrl
      .create({
        header: `Impossible d'obtenir la localisation`,
        message: `Sans localisation, il est impossible d'effectuer une observation.`,
        buttons: [
          {
            text: `Retour à l'accueil`,
            handler: () => this.router.navigate(['/home']),
          },
        ],
        backdropDismiss: false,
      })
      .then((alertEl) => {
        alertEl.present();
        alertEl
          .onDidDismiss()
          .then(() => this.router.navigate(['/home']))
          .catch((err) => {});
      })
      .catch((err) => {});
  }

  /**
   * Will locate the user with high accuracy
   */
  private async autoLocate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorLocalisationAlert();
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

  /**
   * Initialize a Leaflet map in the div with ID 'map'
   */
  private loadLeafletMap() {
    const OPENSTREETMAP_LAYER = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    );
    const ESRI_IMAGERY_LAYER = tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    );

    this.map = new Map('map').setView(
      [this.location.lat, this.location.lng],
      DEFAULT_MAP_ZOOM
    );

    ESRI_IMAGERY_LAYER.addTo(this.map);

    new Control.Layers(
      {
        Plan: OPENSTREETMAP_LAYER,
        Satellite: ESRI_IMAGERY_LAYER,
      },
      {},
      { collapsed: false }
    ).addTo(this.map);
  }

  /**
   * Refresh the position of the person on the map
   */
  private refreshMarkerPos() {
    if (this.markerPosition) {
      this.map.removeLayer(this.markerPosition);
    }

    this.markerPosition = marker([this.location.lat, this.location.lng]).addTo(
      this.map
    );
  }

  /**
   * Refresh the map position and the marker of the person
   */
  private async refreshMapPosition() {
    const loading = await this.loadingController.create({
      message: 'Chargement des coordonnées GPS',
    });
    await loading.present();

    try {
      await this.autoLocate();
      this.refreshMarkerPos();
      this.map.setView(
        [this.location.lat, this.location.lng],
        DEFAULT_MAP_ZOOM
      );
    } catch (err) {
      alert(err);
    }

    await loading.dismiss();
  }

  /**
   *
   */
  public async getLocalisation() {
    await this.refreshMapPosition();
  }

  /**
   * goToSummary
   */
  public goToSummary() {
    this.param.location = this.location;
    this.router.navigate(['/contribution/obstacle-summary']);
  }
}
