import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../services/nav-params.service';
import { ObservationsService } from 'src/app/services/observations.service';
import { Capacitor, Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Location } from '../../models/location.model';
import { Observation } from '../../models/observation.model';
import { Image } from 'src/app/models/image.model';
import { Description } from 'src/app/models/description.model';
import { Router } from '@angular/router';
import { StatusCode } from 'src/app/models/status-code.model';

@Component({
  selector: 'app-obstacle-summary',
  templateUrl: './obstacle-summary.page.html',
  styleUrls: ['./obstacle-summary.page.scss'],
})
export class ObstacleSummaryPage implements OnInit {
  private newObservation = new Observation();
  private image = new Image();
  private description = new Description();
  private location = new Location();
  impact = 1;
  impactStrings = {
    1: { title: 'Faible', text: 'Je peux quand même passer' },
    2: { title: 'Modéré', text: 'Je dois passer avec précaution' },
    3: { title: 'Marqué', text: 'J’ai du mal à passer' },
    4: { title: 'Sévère', text: 'J’ai beaucoup de mal à passer' },
    5: { title: 'Bloquant', text: 'Je ne peux pas passer du tout' },
  };
  impactLabelValue = this.impactStrings['1'];
  comment = '';
  commentHidden = true;
  saveHidden = true;
  statusCode: StatusCode;

  constructor(
    private param: NavParamsService,
    private router: Router,
    private observation: ObservationsService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.autoLocate();
    if (this.param.obstacle != 'other') {
      this.saveHidden = false;
    }
  }

  save() {
    this.description.obstacle = this.param.obstacle;
    this.description.impact = Number(this.impact);
    this.description.freeText = this.comment;
    this.image.imageData = this.param.image;
    this.newObservation.description = this.description;
    this.newObservation.image = this.image;
    this.newObservation.location = this.location;
    this.observation.createObservation(this.newObservation).subscribe({
      next: (observation) => {
        console.log(observation);
        this.showAlert(
          'Observation terminée !',
          `<center>
            <ion-icon name="checkmark-circle-outline"></ion-icon></ion-icon><br>
            Votre observation a bien été envoyée.<br><br>Merci pour votre contribution !
          </center>`,
          `Retour à l'accueil`
        );
      },
      error: (err) => {
        this.statusCode = new StatusCode().deserialize(err.error);
        this.showAlert(
          'Un problème est survenu',
          `<center>
            <ion-icon name="close-outline"></ion-icon></ion-icon><br>
            Une erreure est survenue lors de l\'envoi de votre observation.<br>
            Il faut malheureusement recommencer depuis la page d\'accueil
          </center>`,
          `J'ai compris`
        );
      },
    });
  }

  async showAlert(header, message, button) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      backdropDismiss: false,
      buttons: [
        {
          text: button,
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }

  editImpact() {
    this.impactLabelValue = this.impactStrings[this.impact];
  }

  showSave() {
    this.saveHidden = false;
  }
  private autoLocate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        this.location.lat = geoPosition.coords.latitude;
        this.location.lng = geoPosition.coords.longitude;
      })
      .catch((error) => {
        this.location.lat = 0;
        this.location.lng = 0;
        this.showErrorAlert();
      });
  }

  private showErrorAlert() {
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
      })
      .then((alertEl) => alertEl.present());
  }
}
