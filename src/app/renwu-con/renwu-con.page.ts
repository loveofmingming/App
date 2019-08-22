import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksModel,ToolsModel,CameraModel,LoginModel} from '../model';
import { ConfigModel} from '../model/config.model';
import {AlertController,ModalController,NavParams } from '@ionic/angular'; 

 

import 'hammerjs';
@Component({
  selector: 'app-renwu-con',
  templateUrl: './renwu-con.page.html',
  styleUrls: ['./renwu-con.page.scss'],
})
export class RenwuConPage implements OnInit {
  id:string;
  tasksListCon:any;
  lingquCon:any;
  renwu_con_color:any;
  renwu_con_status:number;//控制选项卡
  renwu_submit_status:string;//控制提交按钮
  serve_img_url:string;
  showBigImageState:boolean;
  big_img:string;
  user_id:any;
  constructor(
              public route: ActivatedRoute,
              public router:Router, 
              public tasks:TasksModel,
              public tools:ToolsModel,
              public camera:CameraModel,
              public loginmodel: LoginModel,
              public alertcontroller:AlertController,
              public modalCtrl:ModalController,
              public navParams: NavParams
              ) { 
    this.serve_img_url = ConfigModel.BASE_IMG_URL;
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.renwu_submit_status = this.route.snapshot.paramMap.get('status');


    this.id = this.navParams.get('tid');
    this.renwu_submit_status = this.navParams.get('status');



    this.tasksListCon = [];
    this.renwu_con_color = [];
    this.showBigImageState=false;
    this.user_id="";
  }

  ngOnInit() {
    this.loginmodel.LoginSession().subscribe(res => {
      let login_info:any = this.tools.decodeUrlList(res);

      if(login_info.error != '0'){
        this.router.navigateByUrl('/home');
        return;
      }else{
        // this.getUnserInfo();
        this.user_id = login_info.body.id;
        this.getTasksCon(this.id);
        this.renwu_con_status = 1;
        this.renwu_con_color.renwu_color = 'ffffff';
        this.renwu_con_color.renwu_bgcolor = 'ff6600';
        this.renwu_con_color.xize_color = 'ff6600';
        this.renwu_con_color.xize_bgcolor = 'ffffff';
      }
    }); // 登陆验证

  }
  // getUnserInfo()  {
  //   this.user_id = window.localStorage.getItem('userId');
  // }
  getTasksCon(id){
    let con = {
      id: id
    };
    this.tasks.getTasksCon(con).subscribe(res => {
      let ress:any = this.tools.decodeUrlList(res);
      if(ress.error == '0'){
          this.tasksListCon = ress.body;
      }
    });
  }
  insertMyTasksCon(id){
    // this.lingquCon = JSON.stringify({
    //   uid:this.user_id,
    //   tid:id
    // })    
    let con = { 
      tid:id
    };
    this.tasks.insertMyTasksCon(con).subscribe(res => {
      let in_res:any = res;
      if(in_res.error != '0'){
        this.onTixing(decodeURIComponent(in_res.body));return;
      }
      this.onTixing(decodeURIComponent(in_res.body),'1');
    });
  }
  renwu_con_qie(state){
    if(state == 1){
      this.renwu_con_color.renwu_color = 'ffffff';
      this.renwu_con_color.renwu_bgcolor = 'ff6600';
      this.renwu_con_color.xize_color = 'ff6600';
      this.renwu_con_color.xize_bgcolor = 'ffffff';
    }else{
      this.renwu_con_color.renwu_color = 'ff6600';
      this.renwu_con_color.renwu_bgcolor = 'ffffff';
      this.renwu_con_color.xize_color = 'ffffff';
      this.renwu_con_color.xize_bgcolor = 'ff6600';
    }
    this.renwu_con_status = state;
  }

  hideBigImage(){
    this.showBigImageState=false;
  }

  showBigImage(url){
    this.big_img = url;
    this.showBigImageState=true;
  }
  async onTixing(mess,type="") {
    const alert = await this.alertcontroller.create( {
      message: mess,
      buttons: [      {
        text: '知道了',
        handler: () => {
          if(type == '1'){
            window.location.reload();
          }
        }
      }]
    });
    await alert.present();
  }
  back(){
    this.modalCtrl.dismiss();
  }
  
}
