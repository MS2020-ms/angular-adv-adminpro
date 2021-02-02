import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';

//importar graficas para Angular desde https://valor-software.com/ng2-charts/#/GeneralInfo
//SOLO en components.module donde lo voy a utilizar si es en toda la aplicacion, entonces en app.module
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  //Lo exporto porque voy a necesitar estos componentes fuera de este modulo 
  exports: [
    IncrementadorComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  //import FormsModule (xa usar ngModel desde progress html), ChartsModule
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
//importar ComponentsModule en archivo pages.module.ts [Donde los voy a utilizar]
export class ComponentsModule { }
