import {NgModule}         from '@angular/core';
import {CommonModule}     from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {ContactComponent} from './contact/contact.component';
import {HelpersModule}    from '../helpers/helpers.module';
import {RouterModule}     from '@angular/router';

@NgModule({
    declarations: [
        WelcomeComponent,
        ContactComponent
    ],
    imports:      [
        CommonModule,
        HelpersModule,
        RouterModule
    ],
    exports: [
        WelcomeComponent,
        ContactComponent
    ]
})
export class PagesModule {}
