import { Component, OnInit } from '@angular/core';
import { TasksModel,ToolsModel,LoginModel,LocalStorageModel} from '../model';
import { ConfigModel} from '../model/config.model';
import { ToastController } from '@ionic/angular';   //弹窗类库
import { ActivatedRoute, Router } from '@angular/router'; 
import {ModalController,NavParams } from '@ionic/angular'; 

@Component({
  selector: 'app-renwu-tongguo',
  templateUrl: './renwu-tongguo.page.html',
  styleUrls: ['./renwu-tongguo.page.scss'],
})
export class RenwuTongguoPage implements OnInit {
  mtid:string;
  tid:string;
  tasksListCon:any;
  img_url:string;
  tasksJiangLiCon:any;
  lingquJiangliJieguo:any;
  JlBig:string; 
  
  jiangli : any = {   //定义数组
    action:'',
    rmb_r_num:'',
    rmb_x_num:'',
    dhb_r_num:'',
    dhb_x_num:'',
    bonus_type:'',
    bonus:'',
    isshow:false,
    isshow_ok:false
  }


  constructor(
    public tasksmodel:TasksModel,
    public toolsmodel:ToolsModel,
    public LocalStorageModel:LocalStorageModel,
    public route: ActivatedRoute,
    public router:Router,
    public loginmodel: LoginModel,
    public toastcon:ToastController,
    public modalCtrl:ModalController,
    public navParams: NavParams
    ) {
    this.img_url = ConfigModel.BASE_IMG_URL;
    // this.mtid = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');

    this.mtid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');

    this.tasksListCon = [];
    this.tasksJiangLiCon=[];
    this.lingquJiangliJieguo=[];
  }
  ngOnInit() {
    
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.toolsmodel.decodeUrlList(res);
      if(login_info.error != '0'){
        this.router.navigateByUrl('/home');
        return;
      }else{
        this.getTasksCon(this.mtid,this.tid)
      }
    }); // 登陆验证
  }
   /**
   * 获取任务详情
   * @param id 
   */
  getTasksCon(mtid,tid){ 
    let con = {
      mtid: mtid,
      tid: tid,
    };
    this.tasksmodel.getOneMytasksTongGuoCon(con).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
          this.tasksListCon = ress.body;
      }else{
        this.router.navigate(['/index-tab']);
      }
    });
  }

  lingQuJiangLi(){
    let lingqu_con = {
      tid :this.tid
    }
    this.tasksmodel.getOneTaskJiangliById(lingqu_con).subscribe(res => {
      this.tasksJiangLiCon = res;
      console.log(this.tasksJiangLiCon);
      if(this.tasksJiangLiCon.error == '0'){
        this.tasksJiangLiCon = this.toolsmodel.decodeUrlList(this.tasksJiangLiCon.body);
        this.jiangli.action=this.tasksJiangLiCon.action;
        this.jiangli.rmb_r_num=this.tasksJiangLiCon.rmb_r_num;
        this.jiangli.rmb_x_num=this.tasksJiangLiCon.rmb_x_num;
        this.jiangli.dhb_r_num=this.tasksJiangLiCon.dhb_r_num;
        this.jiangli.dhb_x_num=this.tasksJiangLiCon.dhb_x_num;
        if(this.tasksJiangLiCon.action==9){
          this.jiangli.isshow = true;
        }else{
          this.toastTip("无权限领取,请返回！"); 
        }
      }else{
          this.toastTip(this.tasksJiangLiCon.body); 
      }
      
    });
  } 

  lingQuJiangLiSub(){
    if(this.JlBig){
        if(this.JlBig=="rmb"){
          this.jiangli.bonus_type=0;
        }else{
          this.jiangli.bonus_type=1;
        }
        let lingqu_sub = {
          bonus_type:this.jiangli.bonus_type,
          rmb_r_num:this.jiangli.rmb_r_num,
          rmb_x_num:this.jiangli.rmb_x_num,
          dhb_r_num:this.jiangli.dhb_r_num,
          dhb_x_num:this.jiangli.dhb_x_num,
          tid:this.tid,
          mtid:this.mtid
        }
        this.tasksmodel.setLingquJiangli(lingqu_sub).subscribe(res => {      
          if(res){
            this.jiangli.isshow = false;
            this.jiangli.isshow_ok = true;
            this.toastTip("恭喜您，领取成功！");
          }else{              
            this.toastTip("领取失败！");      
          }
        });

    }else{
      this.toastTip("请选要领取的奖励类型！");       
    }
  }

  guanbi(){
    this.jiangli.isshow = false;
  }
 
  guanbi_tiaozhuan(){
    this.guanbi();
    this.back();
  }
 
  //警告提醒部分
  async toastTip(message: string) {
    let toast = await this.toastcon.create({
        message: message,
        duration: 2000,
        position: 'middle' //Type : 	"bottom" | "middle" | "top"
      });
    toast.present();
  }  
  back(){
    this.modalCtrl.dismiss();
  }

}
