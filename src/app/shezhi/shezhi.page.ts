import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';           // 跳转类库
import { LoginModel, LocalStorageModel,ToolsModel} from '../model';
import { ToastController} from '@ionic/angular';   //弹窗类库
declare var Wechat: any;
@Component({
  selector: 'app-shezhi',
  templateUrl: './shezhi.page.html',
  styleUrls: ['./shezhi.page.scss'],
})
export class ShezhiPage implements OnInit {
  user_info: any;
  wx_user_info:any;
  constructor(
    public loginmodel: LoginModel,
    public localstorageModel: LocalStorageModel,
    public tools:ToolsModel,
    public toastCtrl: ToastController,
    public _router: Router
  ) {

  }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.tools.decodeUrlList(res);
      if(login_info.error != '0'){
          this._router.navigateByUrl('/home');
          return;
      }else{
        this.user_info = login_info.body;
        this.loginmodel.getSessionWeixinUserInfo().subscribe(res => {
          let wx_info:any = this.tools.decodeUrlList(res);
            if(wx_info.error != '0'){
                this.wx_user_info = "";
            }else{
                this.wx_user_info = wx_info.body;
            }
          
        })
         
      }
    }); // 登陆验证
  }

  bangdingweixin(){
    Wechat.isInstalled(isInstalled => {
      let scope = "snsapi_userinfo",
          state = "_" + (+new Date());
          Wechat.auth(scope,state,res => { 
            this.loginmodel.updateWeixinInfo(res.code).subscribe(date=>{
              let dates:any = this.tools.decodeUrlList(date);
              if(dates.error != '0'){
                  this.toastTip(dates.body);
              }else{
                this.user_info = dates.body;
                this.toastTip('绑定成功');
              }
            });
        },err=>{
          this.toastTip('登录错误');
          alert(JSON.stringify(err));
        });
    },err=>{
         this.toastTip('请先安装微信客户端');
    })
  }
  //警告提醒部分
  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'middle' //Type : 	"bottom" | "middle" | "top"
      });
    toast.present();
  }  

  tuichuLogin(){
    this.loginmodel.clearSession().subscribe(res=>{

    });
    this._router.navigateByUrl("/home");   // 跳转
  }

}
