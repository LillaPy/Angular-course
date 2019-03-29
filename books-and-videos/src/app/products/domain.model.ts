export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    imageUrl: string;
    date: string;
}

export interface Book extends Product {
    isbn: string;
    authors: string[];
    publisher: string;
    pages: number
}


export interface Video extends Product {
    category: string;
    length: number;
}
