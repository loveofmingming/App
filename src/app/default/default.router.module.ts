import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { DefaultPage } from './default.page';

const routes: Routes = [
    {
        path: '',
        component: DefaultPage,
        children: [
            {
                path: 'renwu',
                children: [
                    {
                        path: '',
                        loadChildren: '../renwu/renwu.module#RenwuPageModule'
                    }
                ]
            },
            {
                path: 'wode',
                children: [
                    {
                        path: '',
                        loadChildren: '../wode/wode.module#WodePageModule',
                    },
                ]
            },
            {
                path: '',
                redirectTo: 'renwu',
                pathMatch: 'full'
            },
            {
                path: 'pickables',
                redirectTo: 'renwu/pickables',
                pathMatch: 'full'
            },
            {
                path: 'mine',
                redirectTo: 'renwu/mine',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DefaultPageRoutingModule {
}
