import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { SiteModule }       from './site/site.module';
import { PagesModule }      from './pages/pages.module';
import { HelpersModule }    from './helpers/helpers.module';
import { ProductsModule }   from './products/products.module';
import {PurchaseModule}     from './purchase/purchase.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule,
    PagesModule,
    HelpersModule,
    ProductsModule,
    PurchaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
