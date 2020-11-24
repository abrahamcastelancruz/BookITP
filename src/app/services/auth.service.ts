import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { LoadingController, ToastController } from '@ionic/angular'
import { Observable, of } from 'rxjs'
import { Student } from '../models/student'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class AuthService {
   student$: Observable<Student>
   student: Student

   constructor(
      private afauth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
      private loadingCtrl: LoadingController,
      private toastr: ToastController,
   ) {
      this.student$ = this.afauth.authState.pipe(
         switchMap((student) => {
            if (student) {
               return this.afs.doc(`students/${student.uid}`).valueChanges()
            } else {
               return of(null)
            }
         }),
      )
   }

   async login(email: string, pass: string) {
      const loading = await this.loadingCtrl.create({
         message: 'Iniciando Sesión...',
         spinner: 'dots',
         showBackdrop: true,
      })

      loading.present()

      this.afauth
         .signInWithEmailAndPassword(email, pass)
         .then(async (data) => {
            if (!data.user.emailVerified) {
               loading.dismiss()
               const emailValidationError = await this.toastr.create({
                  message:
                     'Verifica tu Correo Elecrtrónico para poder Iniciar Sesión',
                  duration: 1500,
                  position: 'top',
                  color: 'danger',
               })
               emailValidationError.present()
               this.logout()
            } else {
               loading.dismiss()
               this.router.navigate(['/dashboard/home'])
            }
         })
         .catch(async (error) => {
            loading.dismiss()
            const loginError = await this.toastr.create({
               message: error.message,
               duration: 1500,
               position: 'top',
               color: 'danger',
            })
            loginError.present()
         })
   }

   logout() {
      this.afauth.signOut().then(() => {
         this.router.navigate(['/login'])
      })
   }
}
