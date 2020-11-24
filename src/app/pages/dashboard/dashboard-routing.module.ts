import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DashboardPage } from './dashboard.page'

const routes: Routes = [
   {
      path: 'dashboard',
      component: DashboardPage,
      children: [
         {
            path: 'home',
            loadChildren: () =>
               import('../home/home.module').then((m) => m.HomePageModule),
         },
         {
            path: 'about',
            loadChildren: () =>
               import('../about/about.module').then((m) => m.AboutPageModule),
         },
         {
            path: 'settings',
            loadChildren: () =>
               import('../settings/settings.module').then(
                  (m) => m.SettingsPageModule,
               ),
         },
         {
            path: 'book-details/:id',
            loadChildren: () =>
               import('../book-details/book-details.module').then(
                  (m) => m.BookDetailsPageModule,
               ),
         },
         {
            path: 'search-book',
            loadChildren: () =>
               import('../search-book/search-book.module').then(
                  (m) => m.SearchBookPageModule,
               ),
         },
      ],
   },
   {
      path: 'dashboard',
      redirectTo: '/dashboard/home',
   },
]

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
