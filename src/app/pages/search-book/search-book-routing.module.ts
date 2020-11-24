import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBookPage } from './search-book.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBookPageRoutingModule {}
