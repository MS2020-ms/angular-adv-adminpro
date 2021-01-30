import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    //console.log('Paso por el CanActivate del Guard');

    //si retorno false no se cargan las rutas, si true si se carga
    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          //si no esta autenticado lo redirijo al login
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
