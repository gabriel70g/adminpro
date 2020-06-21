import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: [
  ]
})
export class GraficodonaComponent implements OnInit {

  // Doughnut
  @Input() ChartLabels: string[] = [];
  @Input() ChartData: number[] = [];
  @Input() ChartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
