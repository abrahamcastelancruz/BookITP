import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
   {
      path: 'login',
      loadChildren: () =>
         import('./pages/login/login.module').then((m) => m.LoginPageModule),
   },
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
   },
   {
      path: '',
      loadChildren: () =>
         import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule,
         ),
      canActivate: [AuthGuard],
   },
   {
      path: 'register',
      loadChildren: () =>
         import('./pages/register/register.module').then(
            (m) => m.RegisterPageModule,
         ),
   },
   {
      path: 'forgot-password',
      loadChildren: () =>
         import('./pages/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordPageModule,
         ),
   },
   {
      path: '**',
      loadChildren: () =>
         import('./pages/page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundPageModule,
         ),
   },
]

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
