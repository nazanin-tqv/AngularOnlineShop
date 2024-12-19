import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { SliderComponent } from "./slider/slider.component";
import { CarouselComponent } from "./carousel/carousel.component";

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [NavbarComponent, SliderComponent, CarouselComponent],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent {

}
