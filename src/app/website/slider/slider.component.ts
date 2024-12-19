import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
@Component({
  selector: 'website-slider',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  images: { id: string; src: string }[] = [
    {
      id: 's1',
      src: 'https://ps.w.org/woo-product-slider/assets/banner-772x250.png?rev=2646089',
    },
    {
      id: 's2',
      src: 'https://www.digikala.com/landing/zarinyalda03/?&promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%D8%B2%D8%B1%DB%8C%D9%86&promo_position=home_slider_new_v2&promo_creative=191047&bCode=191047',
    },
    {
      id: 's3',
      src: 'https://www.digikala.com/landing/mother-day/?&promo_name=%D8%B1%D9%88%D8%B2+%D9%85%D8%A7%D8%AF%D8%B1+%D8%AF%DB%8C%D8%AC%DB%8C%DA%A9%D8%A7%D9%84%D8%A7&promo_position=home_slider_new_v2&promo_creative=190708&bCode=190708',
    },
    {
      id: 's4',
      src: 'https://www.digikala.com/landing/fmcg-brands/?&promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%D9%81%D8%B1%D8%B4+%DA%A9%D9%85%D9%BE%DB%8C%D9%86&promo_position=home_slider_new_v2&promo_creative=190724&bCode=190724',
    },
    {
      id: 's5',
      src: 'https://www.digikala.com/landing/charme-mashhad/?&promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%DA%86%D8%B1%D9%85+%D9%85%D8%B4%D9%87%D8%AF-1&promo_position=home_slider_new_v2&promo_creative=190684&bCode=190684',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
