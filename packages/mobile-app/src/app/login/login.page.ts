import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { StatusCode } from '../models/status-code.model';
import { NavController, LoadingController } from '@ionic/angular';
import { ObservationsService } from 'src/app/services/observations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public statusCode: StatusCode;
  email: string;
  password: string;
  authenticationError = false;

  constructor(
    private authenticationService: AuthenticationService,
    public navCtrl: NavController,
    private observationService: ObservationsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const auth = this.authenticationService.getAuth();
    if (auth) {
      this.navCtrl.navigateRoot('/home');
    }
  }

  async authenticate() {
    const loading = await this.showLoading();

    this.authenticationService
      .Authenticate(this.email, this.password)
      .subscribe({
        next: (auth) => {
          loading.dismiss();
          this.authenticationService.setAuth(auth.code, auth.token);
          this.navCtrl.navigateRoot('/home');
        },
        error: (err) => {
          loading.dismiss();
          this.statusCode = new StatusCode().deserialize(err.error);
          this.authenticationError = true;
        },
      });
  }

  private async showLoading() {
    const loading = await this.loadingController.create({});
    await loading.present();
    return loading;
  }
}
