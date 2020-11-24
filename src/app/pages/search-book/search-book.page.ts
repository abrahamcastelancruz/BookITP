import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { BookService } from 'src/app/services/book.service'

@Component({
   selector: 'app-search-book',
   templateUrl: './search-book.page.html',
   styleUrls: ['./search-book.page.scss'],
})
export class SearchBookPage implements OnInit {
   results: Observable<any>
   searchTerm = ''
   constructor(private bookService: BookService) {}

   ngOnInit() {}

   searchChanged() {
      this.results = this.bookService.searchData(this.searchTerm)
   }
}
