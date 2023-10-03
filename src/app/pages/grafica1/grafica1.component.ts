import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public graphData: number[] = [100, 200, 50];
}
