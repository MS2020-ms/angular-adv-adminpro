import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IncrementadorComponent
  ],
  //Lo exporto porque voy a necesitar estos componentes fuera de este modulo 
  exports: [
    IncrementadorComponent
  ],
  //import FormsModule (xa usar ngModel desde progress html)
  imports: [
    CommonModule,
    FormsModule
  ]
})
//importar ComponentsModule en archivo pages.module.ts [Donde los voy a utilizar]
export class ComponentsModule { }
