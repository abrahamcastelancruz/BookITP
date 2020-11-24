import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBookPageRoutingModule } from './search-book-routing.module';

import { SearchBookPage } from './search-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBookPageRoutingModule
  ],
  declarations: [SearchBookPage]
})
export class SearchBookPageModule {}
