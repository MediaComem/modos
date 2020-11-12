import { Component, OnInit } from '@angular/core';
import { NavParamsService } from '../../services/nav-params.service';
import { ObservationsService } from 'src/app/services/observations.service';
import { Capacitor, Plugins } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
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

  public impact = 1;
  public impactStrings = {
    1: { title: 'Faible', text: 'Je peux quand même passer' },
    2: { title: 'Modéré', text: 'Je dois passer avec précaution' },
    3: { title: 'Marqué', text: 'J’ai du mal à passer' },
    4: { title: 'Sévère', text: 'J’ai beaucoup de mal à passer' },
    5: { title: 'Bloquant', text: 'Je ne peux pas passer du tout' },
  };
  public impactLabelValue = this.impactStrings[1];

  public comment = '';
  public commentHidden = true;
  public isCommentsMandatory = false;
  public isSaveBtnDisabled = false;

  public statusCode: StatusCode;

  constructor(
    private param: NavParamsService,
    private router: Router,
    private observation: ObservationsService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.isSaveBtnDisabled = true;
    try {
      await this.autoLocate();
      this.isSaveBtnDisabled = false;
      if (this.param.obstacle === 'other') {
        this.isCommentsMandatory = true;
        this.isSaveBtnDisabled = true;
      }
    } catch (err) {
      this.showErrorLocalisationAlert();
    }
  }

  /**
   * Save the observation on the API
   */
  async save() {
    this.description.obstacle = this.param.obstacle;
    this.description.impact = this.impact;
    this.description.freeText = this.comment;
    this.image.imageData = this.param.image;
    this.newObservation.description = this.description;
    this.newObservation.image = this.image;
    this.newObservation.location = this.location;

    this.isSaveBtnDisabled = true;

    const loading = await this.showLoading();

    this.observation.createObservation(this.newObservation).subscribe({
      next: (observation) => {
        loading.dismiss();
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
        loading.dismiss();
        this.statusCode = new StatusCode().deserialize(err.error);
        console.error(err);
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

  /**
   * Toggle between the impacts level
   */
  public editImpact() {
    this.impactLabelValue = this.impactStrings[this.impact];
  }

  /**
   * Toggle the save btn
   */
  public showSave() {
    this.isSaveBtnDisabled = false;
  }

  private async showAlert(header, message, button) {
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

  /**
   *
   */
  public cancel() {
    this.showCancelWarning();
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

  private async showCancelWarning() {
    const alert = await this.alertCtrl.create({
      header: `Annuler`,
      message: `Vous allez revenir à la page d'accueil et devrez recommencer le processus de signalisation. Êtes-vous sûr-e ?`,
      buttons: [
        {
          text: `Confirmer`,
          handler: () => this.router.navigate(['/home']),
        },
        {
          text: `Rester ici`,
          role: 'cancel',
        },
      ],
      backdropDismiss: false,
    });

    return alert.present();
  }

  private async showLoading() {
    const loading = await this.loadingController.create({});
    await loading.present();
    return loading;
  }
}
