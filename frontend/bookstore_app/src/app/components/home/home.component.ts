import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductShowcasesComponent } from '../product-showcases/product-showcases.component';
import { CatalogProductCardComponent } from '../catalog-product-card/catalog-product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductShowcasesComponent,
    CatalogProductCardComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent { }
