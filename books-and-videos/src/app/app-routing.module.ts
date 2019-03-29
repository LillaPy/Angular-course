import {NgModule}                  from '@angular/core';
import {Routes, RouterModule}      from '@angular/router';
import {NotFoundComponent}         from './site/not-found/not-found.component';
import {SiteModule}                from './site/site.module';
import {WelcomeComponent}          from './pages/welcome/welcome.component';
import {ContactComponent}          from './pages/contact/contact.component';
import {ProductsModule}            from './products/products.module';
import {BooksListComponent}        from './products/books-list/books-list.component';
import {VideosListComponent}       from './products/videos-list/videos-list.component';
import {ShoppingCartViewComponent} from './purchase/shopping-cart-view/shopping-cart-view.component';
import {OrderFormComponent}        from './purchase/order-form/order-form.component';
import {LoginComponent}            from './auth/login/login.component';
import {LogoutComponent}           from './auth/logout/logout.component';
import {ProductListComponent}      from './admin/product-list/product-list.component';
import {ProductEditComponent}      from './admin/product-edit/product-edit.component';
import {AuthModule}                from './auth/auth.module';
import {AdminModule}               from './admin/admin.module';

const routes: Routes = [
    {path: 'home', component: WelcomeComponent},
    {path: 'contact', component: ContactComponent},

    {
        path: 'products', children: [
            {path: 'books', component: BooksListComponent},
            {path: 'videos', component: VideosListComponent},
        ]
    },
    {
        path: 'purchase', children: [
            {path: 'shopping-cart-view', component: ShoppingCartViewComponent},
            {path: 'order-form', component: OrderFormComponent},
        ]
    },
    {
        path:'auth', children: [
            {path: 'login', component: LoginComponent},
            {path: 'logout', component: LogoutComponent},
        ]
    },
    {
        path:'admin', children: [
            {path: 'product-list', component: ProductListComponent},
            {path: 'product-edit', component: ProductEditComponent},
        ]
    },

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        SiteModule,
        ProductsModule,
        AuthModule,
        AdminModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
