import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetGlobalPositionPage } from './set-global-position.page';
import { CustomComponents } from '../../custom-components/custom-components';

const routes: Routes = [
  {
    path: '',
    component: SetGlobalPositionPage
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
  declarations: [SetGlobalPositionPage]
})
export class SetGlobalPositionPageModule {}
