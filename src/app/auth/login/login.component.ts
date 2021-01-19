import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //stylesUrls
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inyectar router xa navegar a otra ruta
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    //console.log('submit funciona');
    this.router.navigateByUrl('/dashboard');
  }

}
