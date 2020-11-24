import { AngularFirestore } from '@angular/fire/firestore'
import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth'
import { switchMap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'

@Component({
   selector: 'app-settings',
   templateUrl: './settings.page.html',
   styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
   userInfo = null
   uid
   constructor(
      private afs: AngularFirestore,
      private afauth: AngularFireAuth,
   ) {}

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
}
