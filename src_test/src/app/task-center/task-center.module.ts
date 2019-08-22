import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TaskCenterPage} from './task-center.page';
import {MessagePageModule} from '../message/message.module';

const routes: Routes = [
    {
        path: '',
        component: TaskCenterPage,
        children: [
            {
                path: 'pickables',
                children: [
                    {
                        path: '',
                        loadChildren: './pickables/pickables.module#PickablesPageModule'
                    }
                ]
            },
            {
                path: 'mine',
                children: [
                    {
                        path: '',
                        loadChildren: './mine/mine.module#MinePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'pickables',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MessagePageModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TaskCenterPage]
})
export class TaskCenterPageModule {
}
