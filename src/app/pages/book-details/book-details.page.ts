import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { BookService } from 'src/app/services/book.service'

@Component({
   selector: 'app-book-details',
   templateUrl: './book-details.page.html',
   styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
   information = null
   constructor(
      private activatedRoute: ActivatedRoute,
      private bookService: BookService,
   ) {}

   ngOnInit() {
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      this.bookService.getDetails(id).subscribe((res) => {
         console.log(res)
         this.information = res[0]
      })
   }
}
