import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  //stylesUrls
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  // ano actual
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
