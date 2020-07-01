import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren:  './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'contribution',
    children: [
      {
        path: 'select-obstacle',
        loadChildren: './contribution/select-obstacle/select-obstacle.module#SelectObstaclePageModule'
      },
      {
        path: 'take-picture/:obstacle',
        loadChildren: './contribution/take-picture/take-picture.module#TakePicturePageModule'
      },
      {
        path: 'set-global-position',
        loadChildren: './contribution/set-global-position/set-global-position.module#SetGlobalPositionPageModule'
      },
      {
        path: 'obstacle-summary',
        loadChildren: './contribution/obstacle-summary/obstacle-summary.module#ObstacleSummaryPageModule'
      },
      {
        path: 'feedback',
        loadChildren: './contribution/feedback/feedback.module#FeedbackPageModule'
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
