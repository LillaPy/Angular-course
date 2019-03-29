import {Component}   from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
    selector:    'app-shopping-cart-widget',
    templateUrl: './shopping-cart-widget.component.html',
    styleUrls:   ['./shopping-cart-widget.component.scss']
})
export class ShoppingCartWidgetComponent  {

    constructor(private cartSvc: ShoppingCartService) {
    }

    get cart(): ShoppingCartService {
        return this.cartSvc;
    }

}
