import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToolsModel, XiaoJinKusModel, DaoHangBisModel, XinYuZhisModel, LoginModel, LocalStorageModel} from '../model';
import { ConfigModel } from '../Model/config.model';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-wode',
  templateUrl: './wode.page.html',
  styleUrls: ['./wode.page.scss'],
})
export class WodePage implements OnInit {
  xiaojinkuYue: any;
  daohangbiYue: any;
  xinyuzhiYue: any;
  userName: any;
  uid: any;
  userTouxiang: any;
  userInfo: any;
  //private img_url: string = ConfigModel.BASE_TASK_LIST_IMG;
  private img_url: string = ConfigModel.BASE_IMG_USER_URL;
  constructor(
        public alertController: AlertController,
        public toolsmodel: ToolsModel,
        public router:Router,
        public xiaojinkusModel: XiaoJinKusModel,
        public daohangbisModle: DaoHangBisModel,
        public xinyuzhisModel: XinYuZhisModel,
        public loginmodel: LoginModel,
        public localstorageModel: LocalStorageModel
     ) {
        this.xiaojinkuYue = '';
        this.daohangbiYue = '';
        this.xinyuzhiYue = '';
        this.userName = '';
        this.uid = '';
        this.userTouxiang = '';
        this.userInfo = [];
    }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
          this.router.navigateByUrl('/home');
          return;
      }else{
        this.uid = login_info.body.id;
        this.getUserInfoByUserId()
      }
    }); // 登陆验证
      // this.loginmodel.LoginSession(); // 登陆验证
      // this.getUserId();
      // this.getUserInfoByUserId();
  }
  // getUserId() {
  //    this.uid = this.localstorageModel.getStore('userId');
  // }

  getUserInfoByUserId() {
    this.xiaojinkusModel.getUserInfoByUserId().subscribe(res => {
      let ress:any=this.toolsmodel.decodeUrlList(res);
        if (ress.error == '0') {
          this.userInfo = ress.body;
          this.getAllXiaojinkuYue();
          this.getAllDaohangbiYue();
          this.getAllXinyuzhiYue();
          this.getuserName();
          this.getuserTouxiang();
        } else {
          this.userInfo = ress.body;
        }
     });
  }

  // 获取用户的头像信息
  getuserTouxiang() {
    this.userTouxiang = this.userInfo.touxiang;
  }
  // 获取用户真实姓名
  getuserName() {
    this.userName = this.userInfo.realname;
  }
  // 获取小金库的余额
  getAllXiaojinkuYue() {
    this.xiaojinkuYue = this.userInfo.balance_rmb;
  }
  // 获取导航币的余额
  getAllDaohangbiYue() {
    this.daohangbiYue = this.userInfo.balance_dhb;
  }
  // 获取信誉值
  getAllXinyuzhiYue() {
    this.xinyuzhiYue = this.userInfo.credit;
  }

}
