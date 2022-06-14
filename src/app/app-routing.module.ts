import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'splashscreen',
  //   pathMatch: 'full',
  // },

  {
    path: 'splashscreen',
    loadChildren: () =>
      import('./pages/splashscreen/splashscreen.module').then(
        (m) => m.SplashscreenPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    // ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],

    // ...canActivate(redirectUnauthorizedToLogin),
  },  {
    path: 'complete-data',
    loadChildren: () => import('./pages/complete-data/complete-data.module').then( m => m.CompleteDataPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
