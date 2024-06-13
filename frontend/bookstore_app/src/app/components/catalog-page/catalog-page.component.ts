import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CatalogProductCardComponent } from '../catalog-product-card/catalog-product-card.component';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { OrderingMenuComponent } from '../ordering-menu/ordering-menu.component';
import { FilterService } from '../../services/filter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Book } from '../../models/book';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    CommonModule,
    CatalogProductCardComponent,
    FormsModule,
    ProductFilterComponent,
    OrderingMenuComponent,
    NgxPaginationModule,
    NoResultsMessageComponent
  ],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CatalogPageComponent { 
  books: Book[] = [];

  isEmpty = false;

  currentPage!: number;
  pageSize!: number;
  totalItems!: number;

  showMobileMenu: boolean = false;

  constructor(
    private storeService: StoreService,
    private filterService: FilterService
  ) { 
    this.pageSize = this.filterService.getFilters().page_size;
  }

  ngOnInit(): void {
    this.filterService.filter$.subscribe(filters => {
      this.getBooks(filters);
    });
  }

  getBooks(filters?: any): void {
    this.books = [];

    this.storeService.getBooks(filters).subscribe(response => {
      this.books = response.results;
      this.totalItems = response.count;
      this.isEmpty = this.books.length === 0;
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.filterService.setParameter('page', this.currentPage);
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
