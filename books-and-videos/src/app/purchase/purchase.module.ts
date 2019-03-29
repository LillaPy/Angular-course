import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {HelpersModule}                    from '../helpers/helpers.module';
import {RouterModule}                     from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule}                 from '@angular/common/http';
import {ShoppingCartWidgetComponent}      from './shopping-cart-widget/shopping-cart-widget.component';
import { ShoppingCartViewComponent } from './shopping-cart-view/shopping-cart-view.component';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
    declarations: [
        ShoppingCartWidgetComponent,
        ShoppingCartViewComponent,
        OrderFormComponent
    ],
    imports:      [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HelpersModule
    ],
    exports:      [
        ShoppingCartWidgetComponent,
        ShoppingCartViewComponent
    ]
})
export class PurchaseModule {}
