import {Component, OnInit, OnDestroy}                       from '@angular/core';
import {ProductsService}                                    from '../products.service';
import {Book}                                               from '../domain.model';
import {Subscription}                                       from 'rxjs';
import {FormControl}                                        from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {ShoppingCartService}                                from '../../purchase/services/shopping-cart.service';

@Component({
    selector:    'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls:   ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
    searchPhrase: FormControl = new FormControl();
    books: Book[]             = [];
    booksOrig: Book[];
    booksSubscription: Subscription;

    constructor(private ds: ProductsService, private cartSvc: ShoppingCartService) {
    }

    ngOnInit() {
        this.booksSubscription = this.ds.fetchAllBooks()
            .subscribe(objs => {
                console.info('** books', objs);
                this.books = objs;
            });

        this.searchPhrase.valueChanges
            .pipe(
                debounceTime(800),
                distinctUntilChanged(),
                switchMap(phrase => this.ds.searchBooks(phrase)),
                tap(results => console.log('[search] results:', results))
            )
            .subscribe((results: Book[]) => {
                if (results.length > 0 || this.searchPhrase.value.length > 0) {
                    if (!this.booksOrig) {
                        this.booksOrig = this.books;
                    }
                    this.books = results;
                } else {
                    this.clearSearchField();
                }
            });
    }

    ngOnDestroy() {
        this.booksSubscription.unsubscribe();
    }

    addToCart(book: Book) {
        console.info('addToCart', book);
        this.cartSvc.add(book);
    }

    clearSearchField() {
        this.searchPhrase.reset();
        this.books     = this.booksOrig || [];
        this.booksOrig = undefined;
    }


}
