import {Component}           from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {CartItem}            from '../shoppingcart.model';
import {Product}             from '../../products/domain.model';

@Component({
    selector:    'app-shopping-cart-view',
    templateUrl: './shopping-cart-view.component.html',
    styleUrls:   ['./shopping-cart-view.component.scss']
})
export class ShoppingCartViewComponent {
    constructor(private cartSvc: ShoppingCartService) {
    }

    get items(): CartItem[] {
        return this.cartSvc.items;
    }

    get count(): number {
        return this.items.length;
    }

    get empty(): boolean {
        return this.count === 0;
    }

    get amount():number {
        return this.cartSvc.amount;
    }

    remove(product:Product) {
        this.cartSvc.remove(product);
    }

    clearShoppingCart() {
        this.cartSvc.clear();
    }

}
