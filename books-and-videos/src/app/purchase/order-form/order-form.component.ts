import {Component, OnInit}   from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {CheckoutService}     from '../services/checkout.service';
import {CartItem}            from '../shoppingcart.model';
import {
    FormBuilder,
    FormGroup,
    Validators
}                            from '@angular/forms';

@Component({
    selector:    'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls:   ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
    readonly vatPercentage: number = 0.25;
    readonly shippingFee: number   = 95;
    submitting: boolean            = false;
    form: FormGroup;

    constructor(private cartSvc: ShoppingCartService,
                private checkoutSvc: CheckoutService,
                private formBld: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBld.group({
            name:    ['', Validators.required],
            contact: this.formBld.group({
                email: ['', Validators.email],
                phone: ['',],
            }),
            address: this.formBld.group({
                street:   ['', Validators.required],
                postCode: ['', Validators.required],
                city:     ['', Validators.required],
            }),
        });
    }

    get items(): CartItem[] {
        return this.cartSvc.items;
    }

    get amount(): number {
        return this.cartSvc.amount;
    }

    get vatAmount(): number {
        return this.vatPercentage * this.amount;
    }

    get totalAmount(): number {
        return this.amount + this.vatAmount + this.shippingFee;
    }

    onSubmit() {
        //todo: implement me
    }

}
