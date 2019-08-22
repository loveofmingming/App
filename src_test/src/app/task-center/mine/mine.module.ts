import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MinePage} from './mine.page';
import {ExplainPageModule} from '../explain/explain.module';
import {DetailsPageModule} from '../details/details.module';
import {EditPageModule} from '../edit/edit.module';

const routes: Routes = [
    {
        path: '',
        component: MinePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExplainPageModule,
        DetailsPageModule,
        EditPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MinePage]
})
export class MinePageModule {
}
