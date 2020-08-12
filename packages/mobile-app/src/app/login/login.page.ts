import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { StatusCode } from '../models/status-code.model';
import { NavController } from '@ionic/angular';
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
    private observationService: ObservationsService
    ) { }

  ngOnInit() {
  }

  authenticate() {
    this.authenticationService.Authenticate(this.email, this.password).subscribe({
      next: auth => {
        this.authenticationService.setAuth(auth.code, auth.token);
        this.navCtrl.navigateForward('/home');
      },
      error: (err) => {
        this.statusCode = new StatusCode().deserialize(err.error);
        this.authenticationError = true;
      }
    });
  }

}
