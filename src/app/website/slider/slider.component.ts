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
  images = [
    {
      itemImageSrc: 'assets/images/slider1.jpg',
      alt: 'Slider 1',
      title: 'Slider 1',
    },
    {
      itemImageSrc: 'assets/images/slider2.jpg',
      alt: 'Slider 2',
      title: 'Slider 2',
    },
    {
      itemImageSrc: 'assets/images/slider3.jpg',
      alt: 'Slider 3',
      title: 'Slider 3',
    },
    {
      itemImageSrc: 'assets/images/slider4.jpg',
      alt: 'Slider 4',
      title: 'Slider 4',
    },
    {
      itemImageSrc: 'assets/images/slider5.jpg',
      alt: 'Slider 5',
      title: 'Slider 5',
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
