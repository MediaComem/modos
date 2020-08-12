import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/events.service';
import { ObservationsService } from '../services/observations.service';
import { Event } from '../models/event.model';
import { NavController, AlertController } from '@ionic/angular';
import { StatusCode } from '../models/status-code.model';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Capacitor, Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public events: Event[];
  public observationsCount = 0;
  public statusCode: StatusCode;

  constructor(
    private eventService: EventService,
    private observationService: ObservationsService,
    public navCtrl: NavController,
    public storage: Storage,
    private authenticationService: AuthenticationService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // uncomment following to be logged directly in the app
    /*this.authenticationService.Authenticate("admin@mail.com", "1234").subscribe({
      next: auth => {
        this.authenticationService.setAuth(auth.code, auth.token);
        this.eventService.getEvents().subscribe({
          next: events => this.events = events,
          error: (err) => this.statusCode = new StatusCode().deserialize(err.error)
        });
        this.observationService.getObservations().subscribe({
          next: observations => this.observationsCount = observations.length,
          error: (err) => this.statusCode = new StatusCode().deserialize(err.error)
        });
    },
      error: (err) => this.statusCode = new StatusCode().deserialize(err.error)
    });*/

    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.createMsgBoxNoLocalisationError();
      return;
    }

    Plugins.Geolocation.requestPermissions()
      .then(() => {})
      .catch((err) => {
        this.createMsgBoxNoLocalisationError();
      });

    this.eventService.getEvents().subscribe({
      next: (events) => (this.events = events),
      error: (err) =>
        (this.statusCode = new StatusCode().deserialize(err.error)),
    });
    this.observationService.getObservations().subscribe({
      next: (observations) => (this.observationsCount = observations.length),
      error: (err) =>
        (this.statusCode = new StatusCode().deserialize(err.error)),
    });
  }

  goToSelectObstacle() {
    this.navCtrl.navigateForward('/select-obstacle');
  }

  private createMsgBoxNoLocalisationError() {
    this.alertCtrl
      .create({
        header: `la localisation n'est pas disponible sur votre appareil`,
        message: `l'application ne peut donc pas fonctionnner correctement est va maintenant fermer`,
        buttons: [
          {
            text: `OK`,
            handler: () => {
              navigator['app'].exitApp();
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
