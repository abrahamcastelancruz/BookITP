import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { LoadingController, ToastController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
   selector: 'app-register',
   templateUrl: './register.page.html',
   styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
   registerForm: FormGroup

   constructor(
      private formBuilder: FormBuilder,
      private afs: AngularFirestore,
      private afauth: AngularFireAuth,
      private loadingCtrl: LoadingController,
      private toastr: ToastController,
      private router: Router,
   ) {
      this.createRegisterForm()
   }

   ngOnInit() {}

   async invalidName() {
      if (
         this.registerForm.get('name').invalid &&
         this.registerForm.get('name').touched
      ) {
         const nameError = await this.toastr.create({
            message: 'Ingresa un Nombre Válido',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         nameError.present()
      }
   }

   async invalidEmail() {
      if (
         this.registerForm.get('email').invalid &&
         this.registerForm.get('email').touched
      ) {
         const nameError = await this.toastr.create({
            message: 'Ingresa un Correo Electrónico Válido',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         nameError.present()
      }
   }

   async invalidPassword() {
      if (
         this.registerForm.get('password').invalid &&
         this.registerForm.get('password').touched
      ) {
         const nameError = await this.toastr.create({
            message: 'Ingresa una Contraseña Válida',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         nameError.present()
      }
   }

   createRegisterForm() {
      this.registerForm = this.formBuilder.group({
         name: ['', [Validators.required, Validators.minLength(3)]],
         email: [
            '',
            [
               Validators.required,
               Validators.pattern(
                  '^[A-Z0-9](.?[a-z0-9]){5,}@pachuca.tecnm.mx$',
               ),
            ],
         ],
         password: ['', Validators.required],
         confirmPassword: ['', Validators.required],
         degree: ['', Validators.required],
      })
   }

   async register() {
      let name: string
      let email: string
      let password: string
      let confirmPassword: string
      let degree: string
      if (this.registerForm.status !== 'VALID') {
         const nameError = await this.toastr.create({
            message: 'Ingresa todos los datos',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         nameError.present()
      } else {
         name = this.registerForm.get('name').value
         email = this.registerForm.get('email').value
         password = this.registerForm.get('password').value
         confirmPassword = this.registerForm.get('confirmPassword').value
         degree = this.registerForm.get('degree').value

         if (password !== confirmPassword) {
            const nameError = await this.toastr.create({
               message: 'Las contraseñas no coinciden',
               duration: 1500,
               position: 'top',
               color: 'danger',
            })
            nameError.present()
         } else {
            const loading = await this.loadingCtrl.create({
               message: 'Creando Cuenta',
               spinner: 'dots',
               showBackdrop: true,
            })
            loading.present()

            this.afauth
               .createUserWithEmailAndPassword(email, password)
               .then((data) => {
                  this.afs.collection('students').doc(data.user.uid).set({
                     userId: data.user.uid,
                     name: name,
                     email: email,
                     degree: degree,
                     createdAt: Date.now(),
                  })

                  data.user.sendEmailVerification()
               })
               .then(async () => {
                  loading.dismiss()
                  const success = await this.toastr.create({
                     message: 'Cuenta creada con éxito!!!',
                     position: 'top',
                     color: 'success',
                     duration: 2000,
                  })
                  success.present()
                  this.router.navigate(['/login'])
               })
               .catch(async (error) => {
                  loading.dismiss()
                  const errorToast = await this.toastr.create({
                     message: error.message,
                     position: 'top',
                     color: 'danger',
                     duration: 2000,
                  })
                  errorToast.present()
               })
         }
      }
   }

   login() {
      this.router.navigate(['/login'])
   }
}
