import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonutGraphComponent } from './donut-graph/donut-graph.component';
import { ChartModule } from 'primeng/chart';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [IncreaserComponent, DonutGraphComponent, ModalComponent],
  exports: [IncreaserComponent, DonutGraphComponent, ModalComponent],
  imports: [CommonModule, FormsModule, ChartModule],
})
export class ComponentsModule {}
