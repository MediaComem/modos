import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationComponent } from './location/location.component';
import { CameraComponent } from './camera/camera.component';

@NgModule({
    declarations: [LocationComponent, MapModalComponent, CameraComponent],
    imports: [CommonModule, IonicModule],
    exports: [LocationComponent, MapModalComponent, CameraComponent],
    entryComponents: [MapModalComponent]
})
export class CustomComponents {

}
