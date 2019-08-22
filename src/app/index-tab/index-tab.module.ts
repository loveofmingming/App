import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexTabPage } from './index-tab.page';

import{RenwuShenhezhongPageModule} from '../renwu-shenhezhong/renwu-shenhezhong.module';
import{RenwuZuorenwuPageModule} from '../renwu-zuorenwu/renwu-zuorenwu.module';
import{RenwuUpdateTishiPageModule} from '../renwu-update-tishi/renwu-update-tishi.module';


import{RenwuWanchengPageModule} from '../renwu-wancheng/renwu-wancheng.module';
import{RenwuTongguoPageModule} from '../renwu-tongguo/renwu-tongguo.module';

const routes: Routes = [
  {
    path: '',
    component: IndexTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenwuShenhezhongPageModule,
    RenwuZuorenwuPageModule,
    RenwuUpdateTishiPageModule,
    RenwuWanchengPageModule,
    RenwuTongguoPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexTabPage]
})
export class IndexTabPageModule {}
