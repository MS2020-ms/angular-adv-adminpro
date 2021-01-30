import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //crea las directivas de ngFor ngIf
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
  //Importo RouterModule, FormsModule
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
//importar AuthModule en archivo app.module.ts
export class AuthModule { }
