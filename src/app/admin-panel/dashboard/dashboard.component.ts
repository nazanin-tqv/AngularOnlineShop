import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, ChartItem } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PieChartComponent, LineChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  ctx?: HTMLCanvasElement;

  // ngAfterViewInit(): void {
  //   new Chart(this.ctx as ChartItem, {
  //     type: 'line', // or 'bar', 'pie', etc.
  //     data: {
  //       labels: ['January', 'February', 'March', 'April'],
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: [10, 20, 30, 40],
  //           borderColor: 'rgba(75, 192, 192, 1)',
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           display: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
