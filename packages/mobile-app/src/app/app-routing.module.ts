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
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
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
        loadChildren:
          './contribution/select-obstacle/select-obstacle.module#SelectObstaclePageModule',
      },
      {
        path: 'take-picture/:obstacle',
        loadChildren:
          './contribution/take-picture/take-picture.module#TakePicturePageModule',
      },
      {
        path: 'set-global-position',
        loadChildren:
          './contribution/set-global-position/set-global-position.module#SetGlobalPositionPageModule',
      },
      {
        path: 'obstacle-summary',
        loadChildren:
          './contribution/obstacle-summary/obstacle-summary.module#ObstacleSummaryPageModule',
      },
      {
        path: 'feedback',
        loadChildren:
          './contribution/feedback/feedback.module#FeedbackPageModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
