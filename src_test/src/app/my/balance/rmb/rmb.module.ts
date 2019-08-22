import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RmbPage} from './rmb.page';
import {SecondPageHeaderModule} from '../../../second-page-header.module';

const routes: Routes = [
    {
        path: '',
        component: RmbPage,
        children: [
            {
                path: 'in',
                children: [
                    {
                        path: '',
                        loadChildren: './in/in.module#InPageModule'
                    }
                ]
            },
            {
                path: 'out',
                children: [
                    {
                        path: '',
                        loadChildren: './out/out.module#OutPageModule'
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
    declarations: [RmbPage]
})
export class RmbPageModule {
}
