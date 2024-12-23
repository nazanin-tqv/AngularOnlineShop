import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-outlet',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nav-outlet.component.html',
  styleUrl: './nav-outlet.component.css',
})
export class NavOutletComponent {}
