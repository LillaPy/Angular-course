import {NgModule}          from '@angular/core';
import {CommonModule}      from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {HeaderComponent}   from './header/header.component';
import {SidebarComponent}  from './sidebar/sidebar.component';
import {HelpersModule}     from '../helpers/helpers.module';
import {RouterModule}      from '@angular/router';
import {PurchaseModule}    from '../purchase/purchase.module';

@NgModule({
    declarations: [
        NotFoundComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports:      [
        CommonModule,
        HelpersModule,
        RouterModule,
        PurchaseModule
    ],
    exports:      [
        NotFoundComponent,
        HeaderComponent,
        SidebarComponent
    ]
})
export class SiteModule {}
