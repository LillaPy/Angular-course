import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductEditComponent
    ],
    imports:      [
        CommonModule
    ],
    exports:      [
        ProductListComponent,
        ProductEditComponent
    ]
})
export class AdminModule {}
