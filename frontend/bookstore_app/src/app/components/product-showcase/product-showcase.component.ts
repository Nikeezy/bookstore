import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogProductCardComponent } from '../catalog-product-card/catalog-product-card.component';
import { FilterService } from '../../services/filter.service';
import { StoreService } from '../../services/store.service';
import { Book } from '../../models/book';
import { Showcase } from '../../models/showcase';

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CatalogProductCardComponent
  ],
  templateUrl: './product-showcase.component.html',
  styleUrl: './product-showcase.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductShowcaseComponent {
  @Input() showcase!: Showcase;
  books: Book[] = [];

  constructor(
    private storeService: StoreService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    const filters = structuredClone(this.filterService.getFilters());
    filters.page_size = 4;
    if (this.showcase.genreId !== null) {
      filters.genres.push(this.showcase.genreId);
      this.getBooks(filters);
    }
    else {
      this.getBooks(filters);
    }
  }

  getBooks(filters?: any): void {
    this.storeService.getBooks(filters).subscribe(response => {
      this.books = response.results;
    });
  }
}
