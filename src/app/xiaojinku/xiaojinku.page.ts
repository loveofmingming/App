import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToolsModel, XiaoJinKusModel, LoginModel} from '../model';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';  


@Component({
  selector: 'app-xiaojinku',
  templateUrl: './xiaojinku.page.html',
  styleUrls: ['./xiaojinku.page.scss'],
})
export class XiaojinkuPage implements OnInit {
    shouruList: any;
    xiaojinkuYue: any;
    xiaojinkuType: any;
    userId: any;
    constructor(
            public alertController: AlertController,
            public xiaojinkusModel: XiaoJinKusModel,
            public toolsmodel: ToolsModel,
            public router: Router,
            public loginmodel: LoginModel,
        ) {
        this.shouruList = [];
        this.xiaojinkuYue = '';
        this.xiaojinkuType = '';
        this.userId = '';
    }
    ngOnInit() {
        this.loginmodel.LoginSession().subscribe(res => {
            let login_info:any = this.toolsmodel.decodeUrlList(res);
            if(login_info.error != '0'){
                this.router.navigateByUrl('/home');
                return;
            }else{
            this.userId = login_info.body.id;
            this.getAllXiaojinkuYue();
            this.getAllXiaojinkuZhuanRu();
            }
        }); // 登陆验证
        // this.loginmodel.LoginSession(); // 登陆验证
        // this.getUserInfoid();
    }
    async onTixing() {
      const alert = await this.alertController.create( {
        message: '请添加 微信号：13526080898<br>红包提现。',
        buttons: ['好的']
      });
      await alert.present();
    }
    // 根据infoid获取小金库 的余额
    // getUserInfoid() {
    //     this.userId = window.localStorage.getItem('userId');
    // }
    getAllXiaojinkuYue() {
        this.xiaojinkusModel.getAllXiaoJinKuYueByInfoId().subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if(ress.error=='0'){
                this.xiaojinkuYue = ress.body;
            }else{
                this.xiaojinkuYue = 0;
            }
        });
    }
    // 根据infoid获取小金库的转入记录
    getAllXiaojinkuZhuanRu() {
        this.xiaojinkusModel.getAllXiaoJinKuZhuanRuByInfoId().subscribe(res => {
            this.xiaojinkuType = 'zhuanru';
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if (ress.error != '0') {
                this.shouruList = {};
            } else {
                this.shouruList = ress.body;
                // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
            }
        });
    }
    // 根据infoid获取小金库的转出记录
    getAllXiaojinkuZhuanChu() {
      this.xiaojinkusModel.getAllXiaoJinKuZhuanChuByInfoid().subscribe(res => {
          this.xiaojinkuType = 'zhuanchu';
          let ress:any = this.toolsmodel.decodeUrlList(res);
          if (ress != '0') {
            this.shouruList = {};
          } else {
            this.shouruList = ress.body;
            // this.shouruList = this.toolsmodel.decodeUrlList(this.shouruList.list);
          }
      });
  }

}
