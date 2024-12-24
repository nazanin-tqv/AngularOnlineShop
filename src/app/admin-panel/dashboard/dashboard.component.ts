import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, ChartItem } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BasicChartComponent } from './basic-chart/basic-chart.component';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PieChartComponent,
    LineChartComponent,
    BasicChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  customerSize = 0;
  productSize = 0;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.fetchProductObservable().subscribe({
      next: (res) => {
        this.productSize = res.length;
      },
    });
    this.dataService.fetchCustomerListObservable().subscribe({
      next: (res) => {
        this.customerSize = res.length;
      },
    });
  }
}
