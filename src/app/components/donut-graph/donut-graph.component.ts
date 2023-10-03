import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent {
  @Input() title: string = 'No Title';
  @Input() labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() graphData: number[] = [0, 0, 0];

  data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: this.graphData,
          backgroundColor: ['#6857E6', '#009FEE', '#F1C40F'],
          hoverBackgroundColor: ['#6857E6', '#009FEE', '#F1C40F'],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#000000',
          },
        },
      },
    };
  }
}
