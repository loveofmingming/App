import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DhbPage} from './dhb.page';
import {SecondPageHeaderModule} from '../../../second-page-header.module';

const routes: Routes = [
    {
        path: '',
        component: DhbPage,
        children: [
            {
                path: 'in',
                children: [
                    {
                        path: '',
                        loadChildren: '../rmb/in/in.module#InPageModule'
                    }
                ]
            },
            {
                path: 'out',
                children: [
                    {
                        path: '',
                        loadChildren: '../rmb/out/out.module#OutPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'in',
                pathMatch: 'full'
            }
        ]
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
    declarations: [DhbPage]
})
export class DhbPageModule {
}
