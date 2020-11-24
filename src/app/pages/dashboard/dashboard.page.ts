import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.page.html',
   styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   activePath = '/dashboard/home'
   userInfo = null
   uid
   pages = [
      {
         name: 'Inicio',
         path: '/dashboard/home',
      },
      {
         name: 'Buscar Libro',
         path: '/dashboard/search-book',
      },
      {
         name: 'Historial de Prestamos',
         path: '/dashboard/about',
      },
      {
         name: 'Historial de Deudas',
         path: '/dashboard/about',
      },
      {
         name: 'Acerca de Nosotros',
         path: '/dashboard/about',
      },
      {
         name: 'Datos del Usuario',
         path: '/dashboard/settings',
      },
   ]

   constructor(
      private router: Router,
      private auth: AuthService,
      private afs: AngularFirestore,
      private afauth: AngularFireAuth,
   ) {
      this.router.events.subscribe((event: RouterEvent) => {
         this.activePath = event.url
      })
   }

   ngOnInit() {
      this.afauth.user.subscribe((data) => {
         this.uid = data.uid
         this.afs
            .doc(`students/${this.uid}`)
            .valueChanges()
            .subscribe((val) => {
               this.userInfo = val
            })
      })
   }
   logout() {
      this.auth.logout()
   }
}
