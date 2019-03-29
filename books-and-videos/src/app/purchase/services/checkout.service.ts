import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order}      from '../order.model';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private http: HttpClient) {
    }

    saveOrder(order: Order) {
        console.info('[checkout]', 'order', order);
        //todo: implement this
    }

}
