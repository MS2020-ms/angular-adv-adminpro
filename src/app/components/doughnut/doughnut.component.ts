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

  //Input desde grafica1.html (Padre)
  @Input() title: string = '';

  // Doughnut copiado desde https://valor-software.com/ng2-charts/#/DoughnutChart

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    //{ backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
