import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AboutPage} from './about.page';
import {SecondPageHeaderModule} from '../second-page-header.module';

const routes: Routes = [
    {
        path: '',
        component: AboutPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SecondPageHeaderModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AboutPage]
})
export class AboutPageModule {
}
