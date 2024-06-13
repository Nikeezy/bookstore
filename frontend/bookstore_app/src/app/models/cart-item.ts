import { Book } from "./book";

export interface CartItem {
  id: number;
  cart: number;
  book: Book;
  quantity: number;
}