import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'


import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

    this.googleInit();
  }

  googleInit() {

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          //YOUR_CLIENT_ID ver notas.md del BACKEND or https://developers.google.com/identity/sign-in/web/sign-in -> Go to the Credentials page.
          client_id: '336435646811-aqgj6g638e40m5rn8ti8fc2necd4sdog.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  //Logout
  logout() {
    localStorage.removeItem('token_a_fh');

    //las funciones rompen el this
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  //validar y renovar token antes de pasar por Guard (retorna un true o false)
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token_a_fh') || '';
    //peticion a mi BACKEND
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
      //guardar el nuevo token en LS
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token_a_fh', resp.token)
      }),
      //convertir la respuesta en boolean
      //map function to return 1 boolean value!!!
      map(resp => true),
      catchError(error => of(false))
    );
  }

  //base_url en environment/environment.ts
  //base_url en environment/environment.prod.ts

  //crear usuario para enviar a BD
  crearUsuario(formData: RegisterForm) {

    //primer argumento: url, segundo: data
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token_a_fh', resp.token)
        })
      )
  }

  login(formData: LoginForm) {

    //primer argumento: url, segundo: data
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token_a_fh', resp.token)
        })
      )

  }

  loginGoogle(token) {

    //primer argumento: url, segundo: data
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token_a_fh', resp.token)
        })
      )

  }

}
