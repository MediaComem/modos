import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { Plugins, Capacitor} from '@capacitor/core';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  private location: Location;
  constructor(private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  onLocation() {
    console.log('plop');
    this.actionSheetCtrl.create({header: 'Choix de la méthode', buttons: [
      {text: 'Manuelle - préféré', handler: () => {
        this.openMap();
      }},
      {text: 'Automatique', handler: () => {
        this.autoLocate();
      }},
      {text: 'Annuler', role: 'cancel' }
    ]}).then(actionsheetEl => {
      actionsheetEl.present();
    });
  }

  private openMap() {
    this.modalCtrl.create({component: MapModalComponent}).then(modalEl => {
      modalEl.present();
    });
  }

  private autoLocate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    Plugins.Geolocation.getCurrentPosition().then(geoPosition => {
      //const coordinates: Coordinates = {lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude};
      this.location.lat = geoPosition.coords.latitude;
      this.location.lng = geoPosition.coords.longitude;
      console.log("latitude: " + this.location.lat + ", longitude: " + this.location.lng);
    }).catch(error => {
      this.showErrorAlert();
    });
  }

  private showErrorAlert() {
    this.alertCtrl.create({
      header: 'Erreur de géolocalisation',
      message: 'Utilisez la carte pour choisir la géolocalisation de l\'obstacle',
      buttons: ['J\'ai compris']
    }).then(alertEl => alertEl.present());
  }

}
