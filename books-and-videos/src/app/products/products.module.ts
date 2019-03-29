import {NgModule}                         from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {BooksListComponent}               from './books-list/books-list.component';
import {VideosListComponent}              from './videos-list/videos-list.component';
import {HttpClientModule}                 from '@angular/common/http';
import {HelpersModule}                    from '../helpers/helpers.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PurchaseModule}                   from '../purchase/purchase.module';

@NgModule({
    declarations: [
        BooksListComponent,
        VideosListComponent
    ],
    imports:      [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        PurchaseModule,
        HelpersModule
    ],
    exports: [
        BooksListComponent,
        VideosListComponent
    ]
})
export class ProductsModule {}
