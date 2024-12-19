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
      src: 'https://drive.google.com/file/d/1xnrEqXZHo3T1m19D6WFyNsyJnT1RWw2e/view?usp=sharing',
    },
    {
      id: 's2',
      src: 'https://drive.google.com/file/d/1ZglgmqCXJh4_Da4Zo02LA0wl5Qmd5p-f/view?usp=sharing',
    },
    {
      id: 's3',
      src: 'https://drive.google.com/file/d/1o6udPytozvYs4eZn9K4e-mzxrB3FY8yb/view?usp=sharing',
    },
    {
      id: 's4',
      src: 'https://drive.google.com/file/d/1MlJ0K2x6W27GlKdresDmRQs5KLD-vqyo/view?usp=sharing',
    },
    {
      id: 's5',
      src: 'https://drive.google.com/file/d/12ndqUtY9kjPsQu7r76GKD-G8a8jis9kj/view?usp=sharing',
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
