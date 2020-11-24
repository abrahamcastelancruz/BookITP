import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { BookService } from 'src/app/services/book.service'

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   results: Observable<any>
   slidesOptions = {
      initialSlide: 1,
      speed: 300,
      loop: true,
   }

   bookOptions = {
      initialSlide: 1,
      speed: 300,
      loop: true,
      slidesPerView: 3,
   }

   constructor(private bookService: BookService) {}

   ngOnInit() {
      this.results = this.bookService.getHomeData()
   }
}
