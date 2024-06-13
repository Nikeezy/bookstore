import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { FilterService } from '../../services/filter.service';
import { Filters } from '../../models/filters';
import { Genre } from '../../models/genre';
import { Observable, Subject, auditTime, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Author } from '../../models/author';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductFilterComponent {
  filters: Filters;
  genres: Array<Genre> = [];
  authors: Array<Author> = [];

  currentPage = 1;
  pageSize = 10;

  showGenres: boolean = false;
  showAuthors: boolean = false;
  showPublishers: boolean = false;
  showBookFormats: boolean = false;
  showStock: boolean = false;
  showAgeRating: boolean = false;

  newAuthor: string = ''

  authorSearchResults: Array<Author> = [];
  
  private searchTerms = new Subject<string>();
  private formChange = new Subject<void>();

  constructor(
    private filterService: FilterService,
    private storeService: StoreService
  ) {
    this.loadGenres();
    this.filters = this.filterService.getFilters();
  }

  ngOnInit(): void {
    this.filterService.filter$.subscribe(filters => {
      this.filters = filters;
    });

    this.searchTerms.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(term => this.storeService.getAuthors(term))
    ).subscribe({
      next: authors => this.authorSearchResults = authors,
      error: error => error,
    }
    );

    this.formChange.pipe(
      auditTime(2000),
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  loadGenres(): void {
    this.storeService.getGenres(this.currentPage, this.pageSize).subscribe(
      response => this.genres = response
    );
  }

  applyFilters(): void {
    this.filterService.setFilters(this.filters);
  }

  validateInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    inputElement.value = value.replace(/[^0-9]/g, '');
    this.fixFormChange()
  }

  toggle(section: string) {
    switch (section) {
      case 'genres':
        this.showGenres = !this.showGenres;
        break;
      case 'authors':
        this.showAuthors = !this.showAuthors;
        break;
      case 'publishers':
        this.showPublishers = !this.showPublishers;
        break;
      case 'bookFormats':
        this.showBookFormats = !this.showBookFormats;
        break;
      case 'stock':
        this.showStock = !this.showStock;
        break;
      case 'ageRating':
        this.showAgeRating = !this.showAgeRating;
        break;
      default:
        break;
    }
  }

  onCheckboxChange(event: any, type: string) {
    const value = event.target.value;
    const checked = event.target.checked;

    switch (type) {
      case 'genres':
        if (checked) {
          this.filters.genres.push(value);
        } else {
          this.filters.genres = this.filters.genres.filter(genre => genre !== value);
        }
        break;
      case 'stock':
        this.filters.stock__gte = checked ? 1 : 0;
        break;
      case 'ageRating':
        if (checked) {
          this.filters.age_rating.push(value);
        } else {
          this.filters.age_rating = this.filters.age_rating.filter(ageRating => ageRating !== value);
        }
        break;
      default:
        break;
    }

    this.fixFormChange()
  }

  searchAuthors(): void {
    this.searchTerms.next(this.newAuthor.trim());
  }

  selectAuthor(author: Author): void {
    if (!this.filters.authors.includes(author.id)) {
      this.authors.push(author);
      this.filters.authors.push(author.id);
      this.fixFormChange()
    }

    this.newAuthor = '';
    this.authorSearchResults = [];
  }

  removeAuthor(author: Author): void {
    this.filters.authors = this.filters.authors.filter(id => id !== author.id);
    this.authors = this.authors.filter(a => a !== author);
    this.fixFormChange()
  }

  updateFilter(field: keyof Filters, value: any): void {
    this.filterService.setFilters({ [field]: value });
  }

  fixFormChange(): void {
    this.formChange.next();
  }
}
