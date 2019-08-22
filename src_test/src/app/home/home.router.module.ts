import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
            {
                path: 'task-center',
                children: [
                    {
                        path: '',
                        loadChildren: '../task-center/task-center.module#TaskCenterPageModule'
                    }
                ]
            },
            {
                path: 'my',
                children: [
                    {
                        path: '',
                        loadChildren: '../my/my.module#MyPageModule',
                    },
                ]
            },
            {
                path: '',
                redirectTo: 'task-center',
                pathMatch: 'full'
            },
            {
                path: 'pickables',
                redirectTo: 'task-center/pickables',
                pathMatch: 'full'
            },
            {
                path: 'mine',
                redirectTo: 'task-center/mine',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomePageRoutingModule {
}
