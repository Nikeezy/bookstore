import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductShowcaseComponent } from '../product-showcase/product-showcase.component';
import { Showcase } from '../../models/showcase';

@Component({
  selector: 'app-product-showcases',
  standalone: true,
  imports: [
    CommonModule,
    ProductShowcaseComponent
  ],
  templateUrl: './product-showcases.component.html',
  styleUrl: './product-showcases.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductShowcasesComponent {
  showcases: Showcase[] = [{
    genreId: 1,
    description: 'Любовь на страницах'
  },
  {
    genreId: 8,
    description: 'Войти в IT'
  },
  ];
}
