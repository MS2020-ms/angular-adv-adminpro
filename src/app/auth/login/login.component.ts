import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

//Xa LOGIN GOOGLE SIGN IN
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //stylesUrls
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //xa saber cuando el formulario se envio o no, al crearUsuario lo transformo en true
  public formSubmitted = false;
  //Xa LOGIN GOOGLE SIGN IN
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email_a_fh') || '', [Validators.required, Validators.email]], //o con expresion regular
    password: ['', Validators.required],
    remember: [false] //cuando checkeo el checkbox se vuelve true
  });

  //inyectar router xa navegar a otra ruta
  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  //LOGIN GOOGLE SIGN IN
  ngOnInit(): void {
    this.renderButton();
  }


  //LOGIN NORMAL
  //implementado en el html -> form: (submit)="login()"
  login() {
    //funcion login del usuarios.service.ts
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        //console.log(resp)
        //si es true = checkbox Remember Me seleccionado
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email_a_fh', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email_a_fh');
        }
        //REDIRIGIR a dashboard
        this.router.navigateByUrl('/dashboard');

        //Mostrar Error con SWEETALERT2
      }, (err) => {
        //Si sucede un error
        Swal.fire('Error!', err.error.msg, 'error');
      });
    //console.log(this.loginForm.value);

  }

  //LOGIN GOOGLE SIGN IN
  // No son funciones sino metodos de mi clase
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  // No son funciones sino metodos de mi clase
  // Las funciones normales modifican el this - las funciones de flecha NO
  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  };

  // No son funciones sino metodos de mi clase
  attachSignin(element) {
    //console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.usuarioService.loginGoogle(id_token)
          .subscribe(resp => {
            //REDIRIGIR a dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/dashboard');
            })
          });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
