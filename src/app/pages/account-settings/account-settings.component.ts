import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  //Inyecto servicio en el constructor
  constructor(private settingsService: SettingsService) { }

  //ngOnInit tras inicializar el componente, ya tengo el html y puedo hacer el querySelector
  ngOnInit(): void {
    //recupero tema guardado en ultima navegación
    this.settingsService.checkActualTema();
  }

  cambiarTemaColor(tema: string) {
    this.settingsService.cambiarTemaColor(tema);
  }

}
