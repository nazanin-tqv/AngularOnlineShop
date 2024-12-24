import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { categoryList, Product } from '../../../product/product.model';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-basic-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './basic-chart.component.html',
  styleUrl: './basic-chart.component.css',
})
export class BasicChartComponent implements OnInit {
  products?: Product[];
  data: any;
  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(
    private cd: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.fetchProductObservable().subscribe({
      next: (response) => {
        this.products = response;
        this.initChart();
      },
    });
  }
  getCategorySize(category: string) {
    return this.products?.filter((p) =>
      p.categories.some((c) => c.label === category)
    ).length;
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const labels = categoryList.map((c) => c.label);
      const data = labels.map((c) => this.getCategorySize(c));
      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-orange-400'),
              documentStyle.getPropertyValue('--p-gray-400'),
            ],
          },
        ],
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
