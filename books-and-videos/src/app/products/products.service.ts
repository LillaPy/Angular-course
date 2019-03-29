import {Injectable}        from '@angular/core';
import {HttpClient}        from '@angular/common/http';
import {Observable, EMPTY} from 'rxjs';
import {Book, Video}       from './domain.model';
import {map}               from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    readonly baseUrl: string = 'http://localhost:5000/api/';

    constructor(private http: HttpClient) {
    }

    fetchAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + 'books');
    }

    fetchAllVideos(): Observable<Video[]> {
        return this.http.get<Video[]>(this.baseUrl + 'videos');
    }

    getPublishers(): Observable<string[]> {
        return this.fetchAllBooks().pipe(
            map(list =>
                list.map(book => book.publisher)
                    .sort()
                    .filter((name, ix, arr) => ix === arr.indexOf(name)) //uniq
            )
        );
    }

    getCategory(): Observable<string[]> {
        return this.fetchAllVideos().pipe(
            map(list =>
                list.map(video => video.category)
                    .sort()
                    .filter((name, ix, arr) => ix === arr.indexOf(name)) //uniq
            )
        );
    }

    searchBooks(phrase: string): Observable<Book[]> {
        if (!phrase || phrase.trim().length === 0) {
            return EMPTY;
        }

        phrase = phrase.toLowerCase();
        return this.fetchAllBooks().pipe(
            map(list =>
                list.filter(book => {
                    const payload = [
                        book.title,
                        book.authors.join(''),
                        book.publisher,
                        book.isbn
                    ].join('').toLowerCase();
                    return payload.includes(phrase);
                })
            )
        );
    }
    searchVideos(phrase: string): Observable<Video[]> {
        if (!phrase || phrase.trim().length === 0) {
            return EMPTY;
        }

        phrase = phrase.toLowerCase();
        return this.fetchAllVideos().pipe(
            map(list =>
                list.filter(video => {
                    const payload = [
                        video.title,
                        video.category
                    ].join('').toLowerCase();
                    return payload.includes(phrase);
                })
            )
        );
    }
}
