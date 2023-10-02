import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
    this.data = {
      labels: ['A', 'B'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['#6857E6', '#009FEE'],
          hoverBackgroundColor: ['#6857E6', '#009FEE'],
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
