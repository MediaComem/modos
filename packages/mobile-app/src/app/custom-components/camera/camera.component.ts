import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  @Output() cancelImagePIck = new EventEmitter<void>();

  takenImage: string;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.showErrorAlert();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Camera,
      correctOrientation: true,
      height: 4128,
      width: 2322,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        this.takenImage = image.dataUrl;
        this.imagePick.emit(image.dataUrl);
      })
      .catch((error) => {
        this.cancelImagePIck.emit();
        console.error(error);
      });
  }

  private showErrorAlert() {
    this.alertCtrl
      .create({
        header: `Can't access the camera`,
        message:
          'Your device may not have a camera or your camera is momentarily unavailable.',
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }
}
