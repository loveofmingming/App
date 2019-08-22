import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MapModel, MyTasksModel, ToolsModel, LoginModel, LocalStorageModel} from '../model';
// import { Geolocation  } from '@ionic-native/geolocation/ngx';
import {ModalController,LoadingController} from '@ionic/angular'; 
import { RenwuShenhezhongPage } from '../renwu-shenhezhong/renwu-shenhezhong.page';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
import { RenwuUpdateTishiPage } from '../renwu-update-tishi/renwu-update-tishi.page';

import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';
import { RenwuTongguoPage } from '../renwu-tongguo/renwu-tongguo.page'; 
import { OnEnterPage } from '../model/on-enter-page';

// declare var BMap;
@Component({
    selector: 'app-index-tab',
    templateUrl: './index-tab.page.html',
    styleUrls: ['./index-tab.page.scss'],
})
export class IndexTabPage extends OnEnterPage{
    GoPage:any;
    id: string;
    mytasksList: any;
    doingList: any;
    finishList: any[] = [];
    num: any;
    doingnum: number;
    finishnum: number;
    init:boolean;//标识是否是第一次加载

    constructor(public router: Router,
                public route: ActivatedRoute,
                public mytaskmodel: MyTasksModel,
                public toolsmodel: ToolsModel,
                // public mapmodel: MapModel,
                public httpClient: HttpClient,
                // public geolocation: Geolocation,
                public loginmodel: LoginModel,
                public localstoragemodel: LocalStorageModel,
                public modalCtrl:ModalController,
                public loadingCtrl: LoadingController,
                ) {
        super(router);
        this.doingList = [];
        this.matchUrl = ['/default/renwu/mine'];
        // this.gps_city = '定位失败';
        this.init = true;
    }

    async ngOnInit() {
        this.reload_page();     
    }

    onEnter() {
            this.reload_page();
            console.log('index-tab onEnter');
        
    }

    //第一次进来页面和重新加载的数据 
    async reload_page(){
        await super.showLoading(this.loadingCtrl,'加载中...');
        await this.loginmodel.LoginSessionT().then(res=>{
            let login_info:any  = res;
            if(login_info.error != '0'){
                this.router.navigateByUrl('/home');
                return;
            }
        });
        await this.mytaskmodel.getAllOfMyTasks().then(res=>{
            let ress:any = res;
            if(ress.error == '0'){
                this.mytasksList = ress.body;
                console.log(ress.body);
                var doing = [];
                var doingnum = 0;
                var finishnum = 0;
                var finish = [];
                var that = this;
                this.mytasksList.forEach(function (value, index) {
                    
                    if (value.action == 1) {
                        value.zhuangtai = '做任务';
                        value.link = '/renwu-zuorenwu';
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 2) {
                        value.link = '/renwu-shenhezhong';
                        value.zhuangtai = '审核中';
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 3) {
                        value.zhuangtai = '去修改';
                        value.link = '/renwu-update-tishi';
                        doingnum++;
                        doing.push(value);
                    } else if (value.action == 9 ) {
                        value.zhuangtai = '领取奖励';
                        value.link = '/renwu-tongguo';
                        finishnum++;
                        finish.push(value);
                    } else if (value.action == 11 ) {
                        value.zhuangtai = '已获奖励';
                        value.link = '/renwu-wancheng';
                       
                        finishnum++;
                        finish.push(value);
                    } else if (value.action == 10) {
                        value.zhuangtai = '审核未通过已过期';
                        finishnum++;
                        finish.push(value);
                    }
                });
                this.doingList = doing;
                this.doingnum = doingnum;
                this.finishList = finish;
                this.finishnum = finishnum;
                this.num = finishnum + doingnum;
            }else{
                this.num = 0;
            }
        })
        await this.loadingCtrl.dismiss();
        
    }

    //离开页面的时候触发
    ionViewDidLeave(){
        this.init = false;
    }

    //页面之间切换 出发
    ionViewDidEnter(){
        if(!this.init){
            this.reload_page();
            console.log('index-tab ionViewDidEnter');
        }
    }

    totalNum() {
        // console.log(this.doingList);
        let num = 0;
        this.doingList.forEach(item => {
            num += item.num;
        });
        return num;
    }

  async open_renwu_jxz(link,id,task_id){   
    switch(link){
        case "/renwu-shenhezhong": 
        this.GoPage=RenwuShenhezhongPage;
        break;
        case "/renwu-zuorenwu": 
        this.GoPage=RenwuZuorenwuPage;
        break;    
        case "/renwu-update-tishi": 
        this.GoPage=RenwuUpdateTishiPage;
        break;              
    }

    const modal = await this.modalCtrl.create(
        {
            component: this.GoPage,
            componentProps: { 
                'id': id,
                'tid': task_id 
            }
        }
    )
    modal.onDidDismiss().then(res=>{
        this.reload_page();
      });
    await  modal.present();
  }

  async open_renwu_wc(link,id,task_id){    

    switch(link){
        case "/renwu-wancheng": 
        this.GoPage=RenwuWanchengPage;
        break;
        case "/renwu-tongguo": 
        this.GoPage=RenwuTongguoPage;
        break;              
    }    
    const modal = await this.modalCtrl.create(
        {
            component: this.GoPage,
            componentProps: { 
                'id': id,
                'tid': task_id 
            }
        }
    );
    await  modal.present();
  }
}
