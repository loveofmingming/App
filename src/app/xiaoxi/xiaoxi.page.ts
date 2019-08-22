import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {MapModel,  ToolsModel, LocalStorageModel,LoginModel,MyXiaoxisModel} from '../model';

import { Geolocation  } from '@ionic-native/geolocation/ngx';
import {ModalController} from '@ionic/angular';
import { RenwuShenhezhongPage } from '../renwu-shenhezhong/renwu-shenhezhong.page';
import { RenwuZuorenwuPage } from '../renwu-zuorenwu/renwu-zuorenwu.page';
import { RenwuUpdateTishiPage } from '../renwu-update-tishi/renwu-update-tishi.page';

import { RenwuWanchengPage } from '../renwu-wancheng/renwu-wancheng.page';
import { RenwuTongguoPage } from '../renwu-tongguo/renwu-tongguo.page'; 

declare var BMap;
@Component({
  selector: 'app-xiaoxi',
  templateUrl: './xiaoxi.page.html',
  styleUrls: ['./xiaoxi.page.scss'],
})
export class XiaoxiPage implements OnInit {

    id: string;
    myxiaoxiList: any;
    messageslist:any[] = [];
    num: number;
    GoPage:any;
    constructor(public router: Router,
                public route: ActivatedRoute,

                public toolsmodel: ToolsModel,
                public httpClient: HttpClient,
                public localstorageModel: LocalStorageModel,
                public loginmodel: LoginModel,
                public myxiaoximodel:MyXiaoxisModel,
                private modalCtrl: ModalController
                ) {
    }

  ngOnInit() {

    
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
          this.router.navigateByUrl('/home');
          return;
      }else{
        this.getMyXiaoxiList();
      }
    }); // 登陆验证
        // this.loginmodel.LoginSession(); // 登陆验证
        // var uid = this.localstorageModel.getStore('userId');
        // this.getMyXiaoxiList(uid);


  }

  getMyXiaoxiList(){
      this.myxiaoximodel.getAllOfMyXiaoxis().subscribe(res => {
        let ress:any = this.toolsmodel.decodeUrlList(res);
        if(ress.error == '0'){
          this.myxiaoxiList = ress.body;
          var doing = [];
          this.myxiaoxiList.forEach(function (value, index) {
            if (value.action == 1) {
                value.link = '/renwu-zuorenwu';
                doing.push(value);
            } else if (value.action == 2) {
                value.link = '/renwu-shenhezhong';
                doing.push(value);
            } else if (value.action == 3) {
                value.link = '/renwu-update-tishi';
                doing.push(value);
            } else if (value.action == 9 ) {
                value.link = '/renwu-tongguo';
                doing.push(value);
            } else if (value.action == 11 ) {
                value.link = '/renwu-wancheng';
                doing.push(value);
            } else if (value.action == 10) {
                doing.push(value);
            }
        });
          this.myxiaoxiList = doing;
          console.log(this.myxiaoxiList);
        }else{
          this.myxiaoxiList = ress.body;
        }
        
    });
  }


  back() {
    this.modalCtrl.dismiss();
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
    );
    await  modal.present();
  }

  async open_renwu_wc(link,id,task_id,isreads,messageid){    

    switch(link){
        case "/renwu-wancheng": 
        this.GoPage=RenwuWanchengPage;
        break;
        case "/renwu-tongguo": 
        this.GoPage=RenwuTongguoPage;
        break;       
        case "/renwu-shenhezhong": 
        this.GoPage=RenwuShenhezhongPage;
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

    //记录此消息已读
    if(isreads=='0'){
      let con = {
        messageid:messageid,
      };
      this.myxiaoximodel.updateMyXiaoXi(con).subscribe(res => {
      });
    }


  }
}
