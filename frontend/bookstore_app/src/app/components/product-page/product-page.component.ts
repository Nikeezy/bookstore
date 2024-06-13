import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Observable } from 'rxjs';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { NoResultsMessageComponent } from '../no-results-message/no-results-message.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    RouterLink,
    NoResultsMessageComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductPageComponent {
  book!: Book;

  isNotFound = false;
  isInCart = false;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.checkBook(productId);
      this.getBook(productId);
    }
    else {
      this.isNotFound = true;
    }
  }

  getBook(id: string) {
    this.storeService.getBookById(id).subscribe(response => {
      if (response.results && response.results.length > 0) {
        this.book = response.results[0];
        this.isNotFound = false;
      } else {
        this.isNotFound = true;
      }
    });
  }

  checkBook(id: string): void {
    this.cartService.checkItem(id).subscribe({
      next: response => this.isInCart = response.status === 'success',
      error: e => e,
    })
  }

  addToCart(bookId: number): void {
    this.cartService.addItem(bookId).subscribe(response => {
      this.isInCart = true;
    });
  }

  getAuthorsNames(): string {
    return this.book?.authors.map(author => author.full_name).join(', ');
  }

  getGenresNames(): string {
    return this.book?.genres.map(genre => genre.name).join(', ');
  }
}
