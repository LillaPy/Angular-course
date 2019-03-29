import { Component, OnInit } from '@angular/core';
import { Video } from '../domain.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from 'src/app/purchase/services/shopping-cart.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements OnInit {
  videos: Video[] = [];
  videoSubscription: Subscription;
  categorySubscription: Subscription;
  searchPhrase: FormControl = new FormControl();
  videoOrig: Video[];
  categories: string[];

  constructor(private ds: ProductsService, private cartSvc: ShoppingCartService) { }

  ngOnInit() {
    this.videoSubscription = this.ds.fetchAllVideos()
      .subscribe(objs => {
        console.info('** videos', objs);
        this.videos = objs;
      });

    this.searchPhrase.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap(phrase => this.ds.searchVideos(phrase)),
        tap(results => console.log('[search] results:', results))
      )
      .subscribe((results: Video[]) => {
        if (results.length > 0 || this.searchPhrase.value.length > 0) {
          if (!this.videoOrig) {
            this.videoOrig = this.videos;
          }
          this.videos = results;
        } else {
          this.clearSearchField();
        }
      });
      this.categorySubscription=this.ds.getCategory().subscribe(result => {
        console.info('** categories', result);
        this.categories = result;
        console.log(this.categories)
      });
  }
  ngOnDestroy() {
    this.videoSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }


  addToCart(video: Video) {
    console.info('addToCart', video);
    this.cartSvc.add(video);
  }
  clearSearchField() {
    this.searchPhrase.reset();
    this.videos = this.videoOrig || [];
    this.videoOrig = undefined;
  }
  filterCategory(input: any) {
  
    console.log("filterCategory", input.value);
  }
}
