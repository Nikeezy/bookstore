import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-catalog-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './catalog-product-card.component.html',
  styleUrl: './catalog-product-card.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CatalogProductCardComponent {
  @Input() book!: Book;
}
