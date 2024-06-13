import { CartItem } from "./cart-item";

export interface Cart {
    id: number;
    user: number;
    created_at: string;
    items: CartItem[];
}