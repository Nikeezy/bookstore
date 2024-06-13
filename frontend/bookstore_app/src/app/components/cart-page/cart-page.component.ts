import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    CartProductComponent,
    RouterLink,
    PaymentComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CartPageComponent {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  isShowNotification: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  updateQuantity(cartItemId: number, quantity: number) {
    this.cartService.updateQuantity(cartItemId, quantity).subscribe(
      response => {
        if (response.status === 'success') {
          const index = this.cartItems.findIndex(item => item.id === cartItemId);

          if (index !== -1) {
            this.cartItems[index].quantity = response.quantity;
            this.calculateTotalCost();
          }
        }
      }
    );
  }

  deleteItem(cartItemId: number) {
    this.cartService.deleteItem(cartItemId).subscribe(
      response => {
        if (response.status === 'success') {
          this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
          this.calculateTotalCost();
        }
      }
    );
  }

  loadCart() {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.items;
      this.calculateTotalCost();
    });
  }

  calculateTotalCost(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.book.price * item.quantity);
    }, 0)
  }

  checkout(): void {
    this.cartService.checkout().subscribe({
      next: response => {
        if (response.status === 'success') {
          this.cartItems = [];
          this.totalAmount = 0;
          this.showNotification();
        } else {
          console.error('Checkout failed', response.message);
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  showNotification(): void {
    this.isShowNotification = !this.isShowNotification;
  }
}
