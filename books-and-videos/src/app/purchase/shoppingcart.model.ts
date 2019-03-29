import {Product} from '../products/domain.model';

export class CartItem {
    public _count: number = 1;

    constructor(private _product: Product) {
    }

    get count(): number {
        return this._count;
    }

    get product(): Product {
        return this._product;
    }

    get amount(): number {
        return this.count * this.product.price;
    }

    updateCount(delta: number): number {
        this._count += delta;
        if (this.count < 1) this._count = 1;
        return this.count;
    }
}


export class ShoppingCart {
    _items: CartItem[] = [];

    get items(): CartItem[] {
        return this._items;
    }

    get count(): number {
        return this.items
            .map(item => item.count)
            .reduce((sum, n) => sum + n, 0);
    }

    get amount(): number {
        return this.items
            .map(item => item.amount)
            .reduce((sum, n) => sum + n, 0);
    }

    clear(): void {
        this._items.splice(0, this._items.length);
    }

    add(product: Product): void {
        const found = this.items.find(item => item.product.id === product.id);
        if (found) {
            found.updateCount(+1);
            this.sortItems();
        } else {
            this._items.push(new CartItem(product));
        }
    }

    remove(product: Product): void {
        const found = this.items.findIndex(item => item.product.id === product.id);
        if (found > -1) {
            this._items.splice(found, 1);
        }
    }

    private sortItems(): void {
        const comparator = (lhs, rhs) => {
            const lname = lhs.product.title;
            const rname = rhs.product.title;
            if (lname < rname) return -1;
            if (lname > rname) return +1;
            return 0;
        };
        this._items.sort(comparator);
    }

}



