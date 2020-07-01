import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CustomComponents } from '../../custom-components/custom-components';

import { TakePicturePage } from './take-picture.page';

const routes: Routes = [
  {
    path: '',
    component: TakePicturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomComponents
  ],
  declarations: [TakePicturePage]
})
export class TakePicturePageModule {}
