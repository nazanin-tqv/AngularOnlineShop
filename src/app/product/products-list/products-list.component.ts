import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  dummyProducts = [
    {
      id: 'p1',
      name: 'کت مردانه زمستانی',
      description:
        'کت مردانه زمستانی با کیفیت بالا و طراحی شیک. مناسب برای روزهای سرد.',
      summary: 'کت مردانه گرم و راحت برای فصل زمستان، با طراحی مدرن و جذاب.',
      price: 1500000,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAP8AAw8FDCIRHikbFxMaKSsqJiQwLygpKzAxNTM1P1c0NzwJQ9WqPbCgEqFYh2cU5NJnczfB5h7fw6Zc6dR93OsFiKPZq+WXV29w5XxB3q4w4tkNO2OdwSAwZmzV63MA1FdgsWV5fj6l+UGThj61ME4ggNBYPZmWk4z9H7RfP/SFLbXzSltXxl4u2M1f2lcdaRgZhRHDH1dQgFzpyqJ8CAhOK5EBtH//v1eqjFh3CygKxlXEBJ6q3eKNOVFgGrv9yCdbGxsVQZf4s1fl4bD5StqlW4Iyg6kmT2sGBJ1OPdh6Xsl4p7yIE0uKHTO39oGRGmaJwv7VqFCYrfGsn6SYrQ6Yft8/lZ//wBK91rWEhNKU2WaKlY6h6FzZxZXa2dnBzzQsUklfj9zCqx01x3UhpUpzJpdz4hFwQ==',
      category: 'پوشاک/مردانه/زمستانی',
    },
    {
      id: 'p2',
      name: 'تیشرت مردانه تابستانی',
      description: 'تیشرت مردانه تابستانی با جنس نرم و مناسب برای هوای گرم.',
      summary: 'تیشرت نخی و سبک مردانه، ایده‌آل برای فصل تابستان و روزهای گرم.',
      price: 250000,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAP8AAw8FDCIRHikbFxMaKSsqJiQwLygpKzAxNTM1P1c0NzwJQ9WqPbCgEqFYh2cU5NJnczfB5h7fw6Zc6dR93OsFiKPZq+WXV29w5XxB3q4w4tkNO2OdwSAwZmzV63MA1FdgsWV5fj6l+UGThj61ME4ggNBYPZmWk4z9H7RfP/SFLbXzSltXxl4u2M1f2lcdaRgZhRHDH1dQgFzpyqJ8CAhOK5EBtH//v1eqjFh3CygKxlXEBJ6q3eKNOVFgGrv9yCdbGxsVQZf4s1fl4bD5StqlW4Iyg6kmT2sGBJ1OPdh6Xsl4p7yIE0uKHTO39oGRGmaJwv7VqFCYrfGsn6SYrQ6Yft8/lZ//wBK91rWEhNKU2WaKlY6h6FzZxZXa2dnBzzQsUklfj9zCqx01x3UhpUpzJpdz4hFwQ==',
      category: 'پوشاک/مردانه/تابستانی',
    },
    {
      id: 'p3',
      name: 'مانتو زنانه پاییزی',
      description: 'مانتو زنانه پاییزی با طراحی شیک و گرم، مناسب فصل پاییز.',
      summary: 'مانتو زنانه گرم با طراحی زیبا و مناسب برای فصل پاییز.',
      price: 1200000,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAP8AAw8FDCIRHikbFxMaKSsqJiQwLygpKzAxNTM1P1c0NzwJQ9WqPbCgEqFYh2cU5NJnczfB5h7fw6Zc6dR93OsFiKPZq+WXV29w5XxB3q4w4tkNO2OdwSAwZmzV63MA1FdgsWV5fj6l+UGThj61ME4ggNBYPZmWk4z9H7RfP/SFLbXzSltXxl4u2M1f2lcdaRgZhRHDH1dQgFzpyqJ8CAhOK5EBtH//v1eqjFh3CygKxlXEBJ6q3eKNOVFgGrv9yCdbGxsVQZf4s1fl4bD5StqlW4Iyg6kmT2sGBJ1OPdh6Xsl4p7yIE0uKHTO39oGRGmaJwv7VqFCYrfGsn6SYrQ6Yft8/lZ//wBK91rWEhNKU2WaKlY6h6FzZxZXa2dnBzzQsUklfj9zCqx01x3UhpUpzJpdz4hFwQ==',
      category: 'پوشاک/زنانه/پاییزی',
    },
    {
      id: 'p4',
      name: 'کفش بچگانه بهاری',
      description:
        'کفش بچگانه با طرح بهاری و مناسب برای فصل بهار. راحت و بادوام.',
      summary: 'کفش راحتی بچگانه با طراحی جذاب برای فصل بهار.',
      price: 400000,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAP8AAw8FDCIRHikbFxMaKSsqJiQwLygpKzAxNTM1P1c0NzwJQ9WqPbCgEqFYh2cU5NJnczfB5h7fw6Zc6dR93OsFiKPZq+WXV29w5XxB3q4w4tkNO2OdwSAwZmzV63MA1FdgsWV5fj6l+UGThj61ME4ggNBYPZmWk4z9H7RfP/SFLbXzSltXxl4u2M1f2lcdaRgZhRHDH1dQgFzpyqJ8CAhOK5EBtH//v1eqjFh3CygKxlXEBJ6q3eKNOVFgGrv9yCdbGxsVQZf4s1fl4bD5StqlW4Iyg6kmT2sGBJ1OPdh6Xsl4p7yIE0uKHTO39oGRGmaJwv7VqFCYrfGsn6SYrQ6Yft8/lZ//wBK91rWEhNKU2WaKlY6h6FzZxZXa2dnBzzQsUklfj9zCqx01x3UhpUpzJpdz4hFwQ==',
      category: 'پوشاک/بچگانه/بهاری',
    },
    {
      id: 'p5',
      name: 'موبایل اندروید سامسونگ',
      description:
        'موبایل اندروید سامسونگ با سیستم عامل اندروید و صفحه نمایش بزرگ.',
      summary: 'موبایل سامسونگ با صفحه نمایش بزرگ و سیستم عامل اندروید.',
      price: 5000000,
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAP8AAw8FDCIRHikbFxMaKSsqJiQwLygpKzAxNTM1P1c0NzwJQ9WqPbCgEqFYh2cU5NJnczfB5h7fw6Zc6dR93OsFiKPZq+WXV29w5XxB3q4w4tkNO2OdwSAwZmzV63MA1FdgsWV5fj6l+UGThj61ME4ggNBYPZmWk4z9H7RfP/SFLbXzSltXxl4u2M1f2lcdaRgZhRHDH1dQgFzpyqJ8CAhOK5EBtH//v1eqjFh3CygKxlXEBJ6q3eKNOVFgGrv9yCdbGxsVQZf4s1fl4bD5StqlW4Iyg6kmT2sGBJ1OPdh6Xsl4p7yIE0uKHTO39oGRGmaJwv7VqFCYrfGsn6SYrQ6Yft8/lZ//wBK91rWEhNKU2WaKlY6h6FzZxZXa2dnBzzQsUklfj9zCqx01x3UhpUpzJpdz4hFwQ==',
      category: 'کالای دیجیتال/موبایل/اندروید',
    },
  ];

  constructor(private firestoreService: FirestoreService) {}
}
