import { NgModule, Injectable } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class IsSignedInGuard implements CanActivate {
  constructor(private authSrv: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authSrv.getAuth().token;
    const isSignedIn = !(!token || token === '');

    if (!isSignedIn) {
      this.router.navigate(['/login']);
    }

    return isSignedIn;
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'contribution',
    children: [
      {
        path: 'select-obstacle',
        loadChildren: () =>
          import('./contribution/select-obstacle/select-obstacle.module').then(
            (m) => m.SelectObstaclePageModule
          ),
      },
      {
        path: 'take-picture/:obstacle',
        loadChildren: () =>
          import('./contribution/take-picture/take-picture.module').then(
            (m) => m.TakePicturePageModule
          ),
      },
      {
        path: 'set-position',
        loadChildren: () =>
          import(
            './contribution/set-global-position/set-global-position.module'
          ).then((m) => m.SetGlobalPositionPageModule),
      },
      {
        path: 'obstacle-summary',
        loadChildren: () =>
          import(
            './contribution/obstacle-summary/obstacle-summary.module'
          ).then((m) => m.ObstacleSummaryPageModule),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./contribution/feedback/feedback.module').then(
            (m) => m.FeedbackPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
