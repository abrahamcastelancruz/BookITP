import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { LoadingController, ToastController } from '@ionic/angular'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   loginForm: FormGroup

   constructor(
      private formBuilder: FormBuilder,
      private toastr: ToastController,
      private router: Router,
      private auth: AuthService,
      private loadingCtrl: LoadingController,
   ) {
      this.createLoginForm()
   }

   ngOnInit() {}

   createLoginForm() {
      this.loginForm = this.formBuilder.group({
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
      })
   }

   async invalidEmail() {
      if (
         this.loginForm.get('email').invalid &&
         this.loginForm.get('email').touched
      ) {
         const emailError = await this.toastr.create({
            message: 'Ingresa un Correo Electrónico Válido',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         emailError.present()
      }
   }

   async invalidPassword() {
      if (
         this.loginForm.get('password').invalid &&
         this.loginForm.get('password').touched
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

   async login() {
      let email: string
      let password: string

      if (this.loginForm.status !== 'VALID') {
         const formError = await this.toastr.create({
            message: 'Ingresa todos los datos',
            duration: 1500,
            position: 'top',
            color: 'danger',
         })
         formError.present()
      } else {
         email = this.loginForm.get('email').value
         password = this.loginForm.get('password').value
         this.auth
            .login(email, password)
            .then(() => {})
            .catch((error) => {})
      }
   }

   register() {
      this.router.navigate(['/register'])
   }

   forgot() {
      this.router.navigate(['/forgot-password'])
   }

   async toast(message, status) {
      const toast = await this.toastr.create({
         message: message,
         position: 'top',
         color: status,
         duration: 2000,
      })
      toast.present()
   }
}
