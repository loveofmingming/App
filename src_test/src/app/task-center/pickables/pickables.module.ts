import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PickablesPage} from './pickables.page';
import {ExplainPageModule} from '../explain/explain.module';

const routes: Routes = [
    {
        path: '',
        component: PickablesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExplainPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PickablesPage]
})
export class PickablesPageModule {
}
