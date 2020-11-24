import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
   providedIn: 'root',
})
export class BookService {
   url = 'https://www.etnassoft.com/api/v1/get/?'

   constructor(private http: HttpClient) {}

   searchData(title: string): Observable<any> {
      return this.http
         .get(`${this.url}keyword=${encodeURI(title)}&criteria=most_viewed`)
         .pipe(
            map((results) => {
               console.log('RAW : ', results)
               return results
            }),
         )
   }

   getDetails(id): Observable<any> {
      return this.http.get(`${this.url}id=${id}`)
   }

   getHomeData(): Observable<any> {
      return this.http
         .get(
            'https://www.etnassoft.com/api/v1/get/?category=libros_programacion&criteria=most_viewed',
         )
         .pipe(
            map((results) => {
               console.log('RAW : ', results)
               return results
            }),
         )
   }
}
