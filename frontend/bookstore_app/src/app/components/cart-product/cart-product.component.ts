import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CartProductComponent {
  @Input() cartItem!: CartItem;
  @Output() updateQuantityEvent = new EventEmitter<{ cartItemId: number, quantity: number }>();
  @Output() deleteItemEvent = new EventEmitter<number>();
  
  incrementQuantity() {
    this.updateQuantityEvent.emit({ cartItemId: this.cartItem.id, quantity: this.cartItem.quantity + 1 });
  }

  decrementQuantity() {
    this.updateQuantityEvent.emit({ cartItemId: this.cartItem.id, quantity: this.cartItem.quantity - 1 });
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.cartItem.id);
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = input.value;
    const parsedQuantity = parseInt(newQuantity, 10);
    
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      this.cartItem.quantity = 1;
    } else if (parsedQuantity > this.cartItem.book.stock) {
      this.cartItem.quantity = this.cartItem.book.stock;
    } else {
      this.cartItem.quantity = parsedQuantity;
    }

    this.updateQuantityEvent.emit({ cartItemId: this.cartItem.id, quantity: this.cartItem.quantity });
  }

  getAuthorsNames(): string {
    return this.cartItem.book.authors.map(author => author.full_name).join(', ');
  }
}
