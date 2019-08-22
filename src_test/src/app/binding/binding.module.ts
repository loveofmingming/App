import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {BindingPage} from './binding.page';
import {SecondPageHeaderModule} from '../second-page-header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SecondPageHeaderModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: BindingPage
            }
        ])
    ],
    declarations: [BindingPage]
})
export class BindingPageModule {
}
