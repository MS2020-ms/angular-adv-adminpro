import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  //stylesUrls
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //xa saber cuando el formulario se envio o no, al crearUsuario lo transformo en true
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['@gmail.com', [Validators.required, Validators.email]], //o con expresion regular
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioServive: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    //Si el formulario es valido: realizar la creacion - REALIZAR POSTEO
    //este metodo crearUsuario esta def en usuario.service.ts
    //la resp viene del Backend con token
    this.usuarioServive.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        //REDIRIGIR a dashboard
        this.router.navigateByUrl('/dashboard');

        //Mostrar Error con SWEETALERT2
      }, (err) => {
        //Si sucede un error (mensaje, error, icono)
        //ejemplos de sweetalert en https://sweetalert2.github.io/ - examples
        Swal.fire('Error!', err.error.msg, 'error');
      });

  }

  //texto de aviso aparece solo cuando campo no relleno y click en boton de enviar
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  //comprobar que password y repita password sean iguales, sino aviso
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  //validar que los dos password son iguales para enviarlos con submit
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  ngOnInit(): void { }

}
