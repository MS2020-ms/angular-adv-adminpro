import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1: string[] = ['Software', 'Hardware', 'Smartphone'];
  public data1 = [
    [15, 45, 40],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
