import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //crea las directivas de ngFor ngIf
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//Modulo independiente de las rutas abiertas:

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  //Lo exporto por si necesito estos componentes fuera de este modulo (auth.module.ts)
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
//importar AuthModule en archivo app.module.ts
export class AuthModule { }
