import { Component, OnInit } from '@angular/core';
import { TasksModel,ToolsModel,LoginModel,LocalStorageModel} from '../model';
import { ConfigModel} from '../model/config.model';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalController,NavParams } from '@ionic/angular'; 

@Component({
  selector: 'app-renwu-wancheng',
  templateUrl: './renwu-wancheng.page.html',
  styleUrls: ['./renwu-wancheng.page.scss'],
})
export class RenwuWanchengPage implements OnInit {
  mtid:string;
  tid:string;
  tasksListCon:any;
  img_url:string;
  constructor(
    public tasksmodel:TasksModel,
    public toolsmodel:ToolsModel,
    public LocalStorageModel:LocalStorageModel,
    public route: ActivatedRoute,
    public loginmodel: LoginModel,
    public router:Router,
    public modalCtrl:ModalController,
    public navParams: NavParams
    ) {
    this.img_url = ConfigModel.BASE_IMG_URL;
    // this.mtid = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');

    this.mtid = this.navParams.get('id');
    this.tid = this.navParams.get('tid');

    this.tasksListCon = [];
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
    this.tasksmodel.getOneMytasksWanChengCon(con).subscribe(res => {
      let ress:any = this.toolsmodel.decodeUrlList(res);
      if(ress.error == '0'){
          this.tasksListCon = ress.body;
      }else{
        this.router.navigate(['/index-tab']);
      }
    });
  }
  back(){
    this.modalCtrl.dismiss();
  }
}
