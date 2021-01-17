import { Component, Input, OnInit } from '@angular/core';
//imports copiado desde https://valor-software.com/ng2-charts/#/DoughnutChart
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  //Input recibe desde grafica1.html (Padre)
  @Input() title: string = '*Sin titulo*';

  // Doughnut copiado desde https://valor-software.com/ng2-charts/#/DoughnutChart

  //Input recibe desde grafica1.html (Padre)
  //renombro ('labels') ('data')
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100],];

  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
    //{ backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
