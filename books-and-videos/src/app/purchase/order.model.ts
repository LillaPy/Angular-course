import {CartItem} from './shoppingcart.model';

export interface Order {
    id?: string;
    name: string;
    contact: {
        email: string;
        phone?: string;
    };
    address: {
        street: string;
        postCode: string;
        city: string;
    };
    products: CartItem[];
}
