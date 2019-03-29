import {Injectable}             from '@angular/core';
import {CartItem, ShoppingCart} from '../shoppingcart.model';
import {Product}                from '../../products/domain.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    private readonly cart: ShoppingCart = new ShoppingCart();

    constructor() {
    }

    get count(): number {
        return this.cart.count;
    }

    get amount(): number {
        return this.cart.amount;
    }

    get items(): CartItem[] {
        return this.cart.items;
    }

    clear(): void {
        this.cart.clear();
    }

    add(product: Product): void {
        this.cart.add(product);
    }

    remove(product: Product): void {
        this.cart.remove(product);
    }

}
