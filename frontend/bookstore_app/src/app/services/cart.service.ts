import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8000/api/store/cart/';

  constructor(private http: HttpClient) { }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}get_cart/`);
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}update_quantity/`, { cart_item_id: cartItemId, quantity });
  }

  deleteItem(cartItemId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}delete_item/`, { cart_item_id: cartItemId });
  }

  addItem(bookId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}add_item/`, { book_id: bookId });
  }

  checkItem(bookId: string | number): Observable<any> {
    return this.http.post(`${this.apiUrl}check_item/`, { book_id: bookId });
  }

  checkout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}checkout/`, {});
  }
}
