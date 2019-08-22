import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CreditPage} from './credit.page';
import {SecondPageHeaderModule} from '../../../second-page-header.module';

const routes: Routes = [
    {
        path: '',
        component: CreditPage
    }
];

@NgModule({
    imports: [
        SecondPageHeaderModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CreditPage]
})
export class CreditPageModule {
}
