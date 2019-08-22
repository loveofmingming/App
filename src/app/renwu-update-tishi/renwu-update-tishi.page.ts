import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigModel} from '../model/config.model';
import { ToolsModel, MyTasksModel, LoginModel} from '../model';
import {ModalController, NavParams} from '@ionic/angular'; 
import {RenwuConPage} from '../renwu-con/renwu-con.page';
import { RenwuUpdatePage } from '../renwu-update/renwu-update.page';

declare var BMap;
@Component({
  selector: 'app-renwu-update-tishi',
  templateUrl: './renwu-update-tishi.page.html',
  styleUrls: ['./renwu-update-tishi.page.scss'],
})
export class RenwuUpdateTishiPage implements OnInit {
    mid: string;
    tid: string;
    user_id: any;
    taskInfo: any;
    dizhi_type: string;
    gps_address: string;
    img_url: string;
    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public mytasksmodel: MyTasksModel,
        public toolsmodel: ToolsModel,
        public loginmodel: LoginModel,
        public modalCtrl:ModalController,
        public navParams:NavParams
    ) {
        this.img_url = ConfigModel.BASE_IMG_URL;
        // this.mid = this.route.snapshot.paramMap.get('id');
        // this.tid = this.route.snapshot.paramMap.get('tid');

        this.mid = this.navParams.get('id');
        this.tid = this.navParams.get('tid');

        this.user_id = '';
        this.dizhi_type = '1';
        this.taskInfo = [];
    }

    ngOnInit() {
        this.loginmodel.LoginSession().subscribe(res => {
        let login_info:any = this.toolsmodel.decodeUrlList(res);
        if(login_info.error != '0'){
            this.router.navigateByUrl('/home');
            return;
        }else{
            this.user_id = login_info.body.id;
            this.getUpdateMyTaskInfo(this.tid, this.mid);
        }
        }); // 登陆验证
    }

    getUpdateMyTaskInfo(tid, mid) {
        let con = {
            tid:tid,
            mid:mid
          };
        this.mytasksmodel.getInfoMyTaskAllById(con).subscribe(res => {
            let ress:any = this.toolsmodel.decodeUrlList(res);
            if(ress.error=='0'){
                this.taskInfo = ress.body;
                console.log(this.taskInfo);
                if (this.taskInfo) {
                    this.get_address_bybaidumap_shouquan(this.taskInfo.task.lon + 0.006000, this.taskInfo.task.lat + 0.010000);
                }
            }else{
                alert(ress.body);
            }
        });
    }

    /**
     * @param x 授权获取百度地图具体位置
     * @param y
     */
    get_address_bybaidumap_shouquan(x, y) {
        let that = this;
        // 原始GPS坐标转为百度坐标
        var baiduPoint = new BMap.Point(y, x);
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(baiduPoint, function(result) {
            if (result) {
                that.dizhi_type = '0';
                that.gps_address = result.address;
            } else {
                return 'err';
            }
        });
    }

    fangqiUpdate() {
        if (confirm('确定要放弃修改吗？')) {
            let updateData = {
                mid:this.mid,
                tid:this.tid
              };
            this.mytasksmodel.fangqiUpdate(updateData).subscribe(res => {
                let ress:any = this.toolsmodel.decodeUrlList(res);
                if(ress.error=='0'){
                    alert(ress.body);
                    this.back();
                }else{
                    alert(ress.body);
                    this.back();
                }
            });
        }
    }

    back(){
        this.modalCtrl.dismiss();
    }

    async open_con(tid,status){
        
        const modal = await this.modalCtrl.create(
            {
                component: RenwuConPage,
                componentProps: { 
                    'tid': tid,
                    'status': status
                }
            }
        );
        await  modal.present();
    }


    
    
  async open_renwu_update(id,task_id){
    let con = {
        'tid': task_id,
        'mid':id
    }
    var is_guoqi = true;
    await this.mytasksmodel.getIsGuoqiMyTaskById(con).then(res=>{
        if(res.error != '0'){
            is_guoqi = false;
            alert(res.body);
        }
    });
    if(!is_guoqi){
        return false;
    }
    const modal = await this.modalCtrl.create(
        {
            component:RenwuUpdatePage,
            componentProps: { 
                'id': id,
                'tid': task_id 
            }
        }
    );
    await  modal.present();
  }
    

}
