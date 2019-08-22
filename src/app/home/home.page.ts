import { Component } from '@angular/core';
import { Router } from '@angular/router';           //跳转类库
import { ToastController,LoadingController } from '@ionic/angular';   //弹窗类库
// import { Wechat } from '@ionic-native/wechat/ngx';
import { LoginModel,SessionStorageModel, ToolsModel,MapModel} from '../model';              //应用登录操作类 
//import { Sim } from '@ionic-native/sim/ngx';
import { OnEnterPage } from '../model/on-enter-page';
declare let Wechat: any;          //
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends OnEnterPage{ //引入基础页面
  
    sjName: string;  //接收手机账号
    yzmName: string;  //接收手机验证码
    init:boolean;//标识是否是第一次加载
    constructor(   //初始化用到的类库
      public toastCtrl: ToastController,
      public _router:Router,
      public loginmodel: LoginModel,
      public sessionstorageModel: SessionStorageModel,
      public toolsmodel: ToolsModel,
      public mapmodel:MapModel,
      //public sim:Sim,
      // private wechat: Wechat,
      public loadingCtrl:LoadingController
      ) {
        super(_router);
        this.matchUrl = ['/home'];
        this.init = true;
        // this.loginmodel.LoginSession().subscribe(res => {
        //   console.log(res);
        //   let login_info:any = this.toolsmodel.decodeUrlList(res);

        //   if(login_info.error == '0'){
        //     this._router.navigateByUrl("/default");   //跳转
        //   }else{
        //     this.mapmodel.gps_play_shouquan();
        //   }
        // })
        
      }
      async ngOnInit(){ 
        alert('初始化');  //第一次加载执行
        super.ngOnInit();
        this.sjName="";
        this.yzmName="";
      //this.getSim();
    }
    //上面数组内链接跳转触发
    onEnter() {
      alert('继续');
      console.log('onEnter home3');
      this.reload_page();
    }
    async reload_page(){
      alert('好了');
      await this.loginmodel.LoginSessionT().then(res=>{
        let login_info:any = res;
        if(login_info.error == '0'){
          alert('登录成功');
              this._router.navigateByUrl("/default");   //跳转
            }
      });
      await this.mapmodel.gps_play_shouquan();
      // this.loginmodel.LoginSession().subscribe(res => {
      //   console.log(res);
      //   let login_info:any = this.toolsmodel.decodeUrlList(res);

      //   if(login_info.error == '0'){
      //     this._router.navigateByUrl("/default");   //跳转
      //   }else{
      //     this.mapmodel.gps_play_shouquan();
      //   }
      // })
    }
    // 页面之间切换 出发
    ionViewDidEnter(){
      alert('ionViewDidEnter home1');
      if(!this.init){
      alert('ionViewDidEnter home');
      this.reload_page();
      }
    }
    //离开页面的时候触发
    ionViewDidLeave(){
      
      this.sjName="";
      this.yzmName="";
      this.mobileCode = {   //定义数组
        name:"获取验证码",
        time:60,
        disable:true
      };
      this.init = false;
    }

    mobileCode:any = {   //定义数组
      name:"获取验证码",
      time:60,
      disable:true
    };
    // getSim(){
    //   this.sim.getSimInfo().then(
    //     (info) => console.log('Sim info: ', info),
    //     (err) => console.log('Unable to get sim info: ', err)
    //   );
      
    //   this.sim.hasReadPermission().then(
    //     (info) => console.log('Has permission: ', info)
    //   );
      
    //   this.sim.requestReadPermission().then(
    //     () => console.log('Permission granted'),
    //     () => console.log('Permission denied')
    //   );

    // }
    async presentLoadingWithOptions() {
      const loading = await this.loadingCtrl.create({
        spinner: null,
        duration: 5000,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }

    weChatAuth() {
      Wechat.isInstalled(isInstalled => {
        let scope = "snsapi_userinfo",
            state = "_" + (+new Date());
            Wechat.auth(scope,state,res => { 
              this.loginmodel.getWechatInfo(res.code).subscribe(date=>{
                let dates:any = this.toolsmodel.decodeUrlList(date);
                if(dates.error != '0'){
                  this.toastTip(dates.body);
                }else{
                  if(dates.body == ''){
                    this._router.navigateByUrl("/default");   //跳转
                  }else{
                    this._router.navigateByUrl("/bangdingshouji/"+dates.body);   //跳转
                  }
                } 
              });
          },err=>{
            alert('登录错误');
            alert(JSON.stringify(err));
          });
      },err=>{
        alert('请先安装微信客户端');
      })

      
    }
    
    getYanzheng(){
        if(!this.sjName){
          this.toastTip("请输入手机号码！");
          return;
        }
        this.mapmodel.gps_play_shouquan();
        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;           //
        if(!myreg.test(this.sjName)){
            alert("请输入正确的手机号!");return;
        }else{
            let getYzm_info = {
              sjName:this.sjName
            };
            
            this.loginmodel.getYzm(getYzm_info).subscribe(res => {
              res = this.toolsmodel.decodeUrlList(res);
              if(res.error!='0'){
                this.toastTip(res.body); return;
              }else{
                this.mobileCode.disable = false;
                this.setTime();  
                return;
              }
            });
        }
    }
    setTime(){
        if(this.mobileCode.time == 0){
            this.mobileCode.time = 60;
            this.mobileCode.name="获取验证码";
            this.mobileCode.disable = true;
            return;
        }else{
          this.mobileCode.time -- ;
        }
        setTimeout(()=>{     //定时器
          this.mobileCode.name=this.mobileCode.time+"秒后重新获取";
          this.setTime();
        },1000);
    }

    //登录部分
    logoCode : any = {   //定义数组
      name:"登录",
      disable:true
    };

    login(){
     
      if(!this.sjName){
        this.toastTip("请输入手机号码！");
        return;
      }
      if(!this.yzmName){
        this.toastTip("请输入手机验证码！");
        return;
      }
      this.logoCode.name="登录中..";
      this.logoCode.disable=false;
      let post_user_info = {
        sjName:this.sjName,
        yzmName:this.yzmName
      };
      let that = this;             //
      this.loginmodel.accountLogin(post_user_info).subscribe(res => {
        res = this.toolsmodel.decodeUrlList(res);
        if(res.error!=0){
          this.toastTip(res.body);
          this.logoCode.name="登录";
          this.logoCode.disable=true;
          return;
        }else{ 
          this.logoCode.name="登录";
          this.logoCode.disable=true;

          //更新session中经纬度
          let gps_x_y:any = this.mapmodel.gps_x_y();            //
          gps_x_y = gps_x_y.then(function (result) {
            let sessioncon = {
              gpsy:result.longitude,
              gpsx:result.latitude
            };
            console.log(sessioncon);
            that.loginmodel.updateSessionInfo(sessioncon).subscribe(res => {});
          });
          gps_x_y = gps_x_y.catch(function (reason) {
          });
          this._router.navigateByUrl("/default");   //跳转
          return;
        }
      });
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
}
