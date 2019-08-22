import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { TasksModel,MyTasksModel,ToolsModel,CameraModel,LoginModel,MapModel} from '../model';
import { ConfigModel } from '../model/config.model';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation,Geoposition } from '@ionic-native/geolocation/ngx';
import {ModalController,NavParams } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import {RenwuConPage} from '../renwu-con/renwu-con.page';

import 'hammerjs';
declare var BMap;
@Component({
  selector: 'app-renwu-zuorenwu',
  templateUrl: './renwu-zuorenwu.page.html',
  styleUrls: ['./renwu-zuorenwu.page.scss'],
})
export class RenwuZuorenwuPage implements OnInit {
  id:string;
  tid:string;
  tasksListCon:any;
  gongcheng_uploadFileArr:any;
  avatarPath:string;
  dizhi_type:string;
  gps_address:any;
  gps_address_x: any;
  gps_address_y: any;
  showBigImageState:boolean;
  big_img:string;
  big_img_ti:number;
  big_img_i:number;
  big_img_count:number;
  yangliImg:boolean;
  user_id:any;
  lingqu_class:string;
  key_item_arr:any;
  key_item_arr_tmp:any;
  gps_id:string;
  mess_two:any;
  on_scene:string;
  formData:any;
  constructor(
              public route: ActivatedRoute,
              public router:Router,
              public camera:Camera,
              public tasks:TasksModel,
              public mytasks:MyTasksModel,
              public tools:ToolsModel,
              public cameraM:CameraModel,
              public alertController:AlertController,
              private actionSheetController: ActionSheetController,
              public login:LoginModel,
              public geolocation:Geolocation,              
              public modalCtrl:ModalController,
              public transfer: FileTransfer,
              public File: File,
              public navParams: NavParams
        
             ) { 
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.tid = this.route.snapshot.paramMap.get('tid');

    this.id = this.navParams.get('id');
    this.tid = this.navParams.get('tid');
    this.tasksListCon = [];
    this.gongcheng_uploadFileArr = [];
    this.dizhi_type = '1';   
    this.avatarPath='./assets/img/renwu_io_add.png';//默认图片  
    this.gps_address_x = '';
    this.gps_address_y = '';
    this.gps_address = '';
    this.showBigImageState=false;
    this.yangliImg = false;
    this.user_id="";
    this.lingqu_class = "lingqu_no";
    this.key_item_arr = new Array();
    this.key_item_arr_tmp = new Array();
    this.mess_two = new Array();
    this.on_scene = "";
    this.gps_id = "";
  }
  
  ngOnInit() {
    this.login.LoginSession().subscribe(res => {
      let login_info:any = this.tools.decodeUrlList(res);
      if(login_info.error != '0'){
          this.router.navigateByUrl('/home');
          return;
      }else{
        this.user_id = login_info.body.id;
        this.getTasksCon(this.id)
      }
    }); // 登陆验证
  }
  /**
   * 获取任务详情
   * @param id 
   */
  getTasksCon(id){
    //var uid = this.user_id;
    let con = {
      mtid:id 
    }
    this.tasks.getOneMytasksCon(con).subscribe(res => {
      this.tasksListCon = res;
      this.tasksListCon = this.tools.decodeUrlList(this.tasksListCon.body);
      this.setTasksListConTtlistList(this.tasksListCon.tt_list);
      console.log(this.key_item_arr);
      //this.tasksListCon = this.setTasksListConList(this.tasksListCon);
      if(!this.tasksListCon){
        this.router.navigate(['/index-tab']);
      }
    });
  }

  /**
   * 更新tasksListCon.tt_list里面的数据
   * @param tasksListTtCon this.tasksListCon.tt_list
   */
  setTasksListConTtlistList(tasksListTtCon){
      for(var o in tasksListTtCon){
        tasksListTtCon[o].img_srcs = [{img_src:this.avatarPath,dis:1}];
        if(tasksListTtCon[o].key_item == '1'){
          this.key_item_arr.push(tasksListTtCon[o].id);
          this.key_item_arr_tmp.push(tasksListTtCon[o].id);
        }
        if(tasksListTtCon[o].is_gps == '1'){
          this.gps_id =  tasksListTtCon[o].id;
        }
        console.log(tasksListTtCon[o])
      }
  }

  /**
   * 展示弹窗
   * @param i 分项建
   * @param ti 图片建
   */
  showPaizhaoOrxc(i,ti){
    if(this.tasksListCon.tt_list[i].img_srcs[ti].img_src != this.avatarPath){
      this.showBigImage(i,ti);return;
    }
    this.presentActionSheet(i,ti);
  }

  

  /**
   * 放弃分项
   * @param i 分项键
   */
  gongcheng_img_fangqi(i){
    this.tasksListCon.tt_list[i].img_srcs = [];
    this.get_key_item(this.tasksListCon.tt_list[i].id,'2');
    console.log('127'+this.key_item_arr);
  }

  async onTixing(mess,type="") {
    const alert = await this.alertController.create( {
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
  

  /**
   * 做任务 提交 第一步验证是否有项是空 第二步验证是否有项 未达到最少图片上传
   * @param mess 
   * @param button_one 
   * @param button_two 
   * @param type 第几部
   */
  async presentAlertConfirm(mess,button_one,button_two,type) {
    if(mess == '' || mess == '[]' || mess == undefined){
      console.log('提交成功');
      this.photo_submit_tmp();
      return;
    }
    const alert = await this.alertController.create({
      message: mess,
      buttons: [
        {
          text: button_one,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            return;
          }
        }, {
          text: button_two,
          handler: () => {
            if(type == '1' && this.mess_two != "[]"){
              this.presentAlertConfirm(this.mess_two.shift(),"返回去拍照","知道了，继续提交",'2');
              return;
            }else{
              if(this.mess_two == "[]" || this.mess_two == "" || this.mess_two.length == '0'){
                console.log('提交成功');
                this.photo_submit_tmp();
                return;
              }else{
                this.presentAlertConfirm(this.mess_two.shift(),"返回去拍照","知道了，继续提交",'2');
                return;
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }
  /**
   * 弹窗方法
   * @param type 
   * @param index 
   */
  async presentActionSheet(i,ti) {
    console.log(i,ti);
    const actionSheet = await this.actionSheetController.create({
      header: '选择上传方式',
      buttons: [{
        text: '拍照上传',
        icon: 'share',
        handler: () => {
          if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined){
            this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
          }
          if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length  == this.tasksListCon.tt_list[i].max){
              this.onTixing('此项最多张数为'+this.tasksListCon.tt_list[i].max+'张');
              return;
          }
          this.cameraM.getPicModel(100,0,0,0,true,1,120,120).then((imageData) => {
          this.setImgTypeUrl(i,ti,imageData);
          }, (err) => {
            // Handle error
          });
        }
        
      },{
        text: '从相册选取上传',
        icon: 'share',
        handler: () => {
          if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined){
            this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
          }
          if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length  == this.tasksListCon.tt_list[i].max){
              this.onTixing('此项最多张数为'+this.tasksListCon.tt_list[i].max+'张');
              return;
          }
          this.cameraM.getPicModel(100,0,0,0,false,0,120,120).then((imageData) => {
            
            this.setImgTypeUrl(i,ti,imageData);
          }, (err) => {
            // Handle error
          });
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  /**
   * 拍照成功或相册选取照片成功 设置对应的src
   * @param i 分项建
   * @param ti 图片键
   */
  setImgTypeUrl(i,ti,imageData){
    console.log(this.tasksListCon.tt_list[i].img_srcs[ti]);
    this.tasksListCon.tt_list[i].img_srcs[ti].img_src = "data:image/jpeg;base64," + imageData; //给原有默认图片 改为上传的图片
    // this.tasksListCon.tt_list[i].img_srcs[ti].img_src = imageData; //给原有默认图片 改为上传的图片
    this.tasksListCon.tt_list[i].img_srcs[ti].dis = 0;
    this.tasksListCon.tt_list[i].img_srcs.push({img_src:this.avatarPath,dis:1}); //增加一个默认图片
    console.log(this.tasksListCon.tt_list);
    if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] == undefined){
      this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id] = new Array();
    }
    this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].push({img_src:"data:image/jpeg;base64,"+imageData});
    // this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].push({img_src:imageData});
    //验证是否是关键项
    this.get_key_item(this.tasksListCon.tt_list[i].id,'1');
  }

  /**
   * 删除一个图片
   * @param i 
   * @param ti 
   */
  deleteImgOne(i,ti){
    this.tasksListCon.tt_list[i].img_srcs.splice(ti,1);
    this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].splice(ti,1);
    if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[i].id].length == 0){
      this.get_key_item(this.tasksListCon.tt_list[i].id,'2');
    }
  }
  photo_submit(){
    if(JSON.stringify(this.gongcheng_uploadFileArr) == "[]" || this.lingqu_class == 'lingqu_no'){
      //this.onTixing('没有上传图片');
      return;
    }else{
      this.submit_controler();
    }
    
  }
  submit_controler(){
    let i = 0;
    let oi = 0;
    let mess = "";
    this.mess_two = new Array();
    for(var o in this.tasksListCon.tt_list){
        i++;
        if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == undefined || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == "[]" || this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id] == ''){
            if(this.tasksListCon.tt_list[o].is_gps != '1'){
                if (oi == 0) {
                  mess = "第"+i;
                } else {
                  mess = mess+"、"+i;
                }
                oi++;
            }  
        }else{
          console.log('进入至少存入');
          console.log(this.tasksListCon.tt_list[o].id);
          if(this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id].length < this.tasksListCon.tt_list[o].min){
            this.mess_two.push(this.tasksListCon.tt_list[o].name+"照片至少"+this.tasksListCon.tt_list[o].min+"张，您当前上传"+this.gongcheng_uploadFileArr[this.tasksListCon.tt_list[o].id].length+"张，提交后该项无奖励。");
          }
        }
    }
    
    if(mess != ""){
      mess = mess+"项无内容，点击继续提交，默认您放弃提交该项数据。";
      this.presentAlertConfirm(mess,'取消','继续提交','1');
      return;
    }else{
      this.presentAlertConfirm(this.mess_two.shift(),"返回去拍照","知道了，继续提交",'2');
      return;
      
    }
    
  } 
 getBlob (b64Data) {
  let contentType = 'image/png';
  let sliceSize = 512;

  b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

  let byteCharacters = atob(b64Data); //decode base64
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, {type: contentType});
  return blob;
 }
  readerFile(imageURI,o,i) {
    var that = this;
    // if (!imageURI.startsWith('file://')) {
    //   imageURI = 'file://' + imageURI;
    // }
    let blobfile = this.getBlob(imageURI);
    that.formData.append("files"+"["+o+"]["+i+"]", blobfile,"images.jpg");
      // this.File.resolveLocalFilesystemUrl(imageURI).then(function(fileEntry:any){
      //   fileEntry.file(function(fileresult) {
      //       var reader = new FileReader();
      //       console.log('3333333333333');
      //       reader.onloadend = function(e:any) {
      //           var the_file = new Blob([e.target.result ], { type: "image/jpeg" } );
      //           // that.formData.append("files"+"_"+o, the_file);
      //           that.formData.append("files"+"_"+o, the_file,"images.jpg");
      //           // //存储图片二进制流
      //           // that.ImageFileList.push(the_file);
      //           // console.log(that.ImageFileList);
      //           // //存储图片地址用于预览
      //           // that.ImageURIList.push(imageURI);
      //           // console.log(that.ImageURIList);
      //       };
      //       reader.readAsArrayBuffer(fileresult);

      //   });
      // });
  }
  /**
   * 提交 处理数据
   */
  photo_submit_tmp(){

    this.formData = new FormData();
    console.log(this.gongcheng_uploadFileArr);
    for(var o in this.gongcheng_uploadFileArr){
      if(this.gongcheng_uploadFileArr[o]) {
        for (var i in this.gongcheng_uploadFileArr[o]) {
          this.readerFile(this.gongcheng_uploadFileArr[o][i].img_src,o,i);
          //直接存base64
          // this.formData.append("files"+"_"+o, this.gongcheng_uploadFileArr[o][i].img_src,"images.jpg");
        }
      }
      // this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);
    }
    this.formData.append("my_task_id", this.id);
    this.formData.append("lon",this.gps_address_x);
    this.formData.append("lat",this.gps_address_y);
    this.formData.append("address",this.gps_address);
    this.formData.append("on_scene",this.on_scene);
    this.formData.append("gps_id",this.gps_id);
    
    this.formData.append("task_id",this.tid);
    this.formData.append("action",2);
    this.formData.append("filename","files");

    this.tasks.uploads(this.formData).subscribe(res => {
      console.log(res);
    })
    this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）','1');
    // this.router.navigateByUrl('/index');
    //window.location.reload();

    // return ;
      // 修改my_task表中的经纬度
      // let my_task_update_data = {
      //   my_task_id: this.id,
      //   lon: this.gps_address_x,
      //   lat: this.gps_address_y,
      //   address:this.gps_address,
      //   on_scene:this.on_scene
      //   };
        // this.mytasks.updateMyTask(my_task_update_data).subscribe(res => {
      //     let action_records = {
      //       task_id:this.tid,
      //       my_task_id:this.id,
      //       lon:this.gps_address_x,
      //       lat:this.gps_address_y,
      //       action:'2',
      //       //user_id:this.user_id
      //     };
      //     this.tasks.insertTaskActionRecords(action_records).subscribe(res => {
      //         let ress:any = this.tools.decodeUrlList(res);
      //         if(ress.error == '0'){
      //           let in_ta_ac_id = ress.body;
      //           for(var o in this.gongcheng_uploadFileArr){
      //             console.log(this.gongcheng_uploadFileArr[o]);
      //             let gongcheng_params = {
      //               //user_id:this.user_id,
      //               task_id:this.tid,
      //               my_task_id:this.id,
      //               task_item_id:o,
      //               filename:'gongcheng',
      //               in_ta_ac_id:in_ta_ac_id
      //               };
      //             this.cameraM.doUploads(this.gongcheng_uploadFileArr[o],'gongcheng',gongcheng_params);
      //             let gongcheng_my_task_items_params = {
      //               my_task_id:this.id,
      //               task_item_id:o,
      //               user_id:this.user_id,
      //               photo_amount:this.gongcheng_uploadFileArr[o].length,
      //               task_action_records_id:in_ta_ac_id,
      //            };
                //  this.tasks.insertMyTaskItems(gongcheng_my_task_items_params).subscribe(res => {
      //              console.log(res);
      //            })
      //           }
                
      //         }
      //     });
      //   })
      
      // this.onTixing('提交成功！15分钟内会告知您审核结果，请关注您的app通知。（建议您在施工现场稍等十几分钟，如有问题，方便重新拍照）');
      // this.router.navigateByUrl('/index');
  }
  /**
   * 验证必填项 是否已经填写
   */
  get_key_item(id,type){
      if(type == '1'){//添加图片 移除数组锁定
        for(var o in this.key_item_arr){
          if(id == this.key_item_arr[o]){
            this.key_item_arr.splice(o,1);
          }
        }
      }
      if(type == '2'){//删除图片 
          let state = false;
          for(var o in this.key_item_arr_tmp){
            if(id == this.key_item_arr_tmp[o]){
              state = true;
            }
          }
          if(state){
            this.key_item_arr.push(id);
          }
          
      }
      if(this.key_item_arr.length == 0){
        this.lingqu_class = 'lingqu';
      }else{
        this.lingqu_class = 'lingqu_no';
      }
      console.log(this.key_item_arr_tmp);
      console.log(this.key_item_arr);
    }
  /**
   * 在现场获取地理位置
   */
  onGpsTo(){
    this.on_scene = '1';
    this.gps_play_shouquan();
  }
//拉取授权gps
gps_play_shouquan(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.get_address_bybaidumap_shouquan(resp.coords.latitude+0.006000,resp.coords.longitude+0.010000);
   }).catch((error) => {
    console.log(error);
   });
}
/**
 * 
 * @param x 授权获取百度地图具体位置
 * @param y 
 */
get_address_bybaidumap_shouquan(x,y){
  this.gps_address_x = x;
  this.gps_address_y = y;
  let that = this;
  //原始GPS坐标转为百度坐标
  var baiduPoint = new BMap.Point(y,x);
  var myGeo = new BMap.Geocoder();
  myGeo.getLocation(baiduPoint,function(result){
      if(result){
        that.dizhi_type = '0';
        that.gps_address = result.address;
        that.get_key_item(that.gps_id,'1');
      }else{
        return 'err';
      }
  });
}

  hideBigImage(){
    this.showBigImageState=false;
  }

  showBigImage(i,ti){
    this.big_img_count=this.tasksListCon.tt_list[i].img_srcs.length-1;
    this.big_img = this.tasksListCon.tt_list[i].img_srcs[ti].img_src;
    this.big_img_i = i;
    this.big_img_ti = ti;
    this.yangliImg = false;
    this.showBigImageState=true;
  }

  /**
   * 查看样例
   * @param i 
   */
  yangliImgOne(i){
    this.big_img_ti = 0;
    this.big_img_count=1;
    this.big_img = ConfigModel.BASE_IMG_URL+'/'+this.tasksListCon.tt_list[i].img_name;
    this.yangliImg = true;
    this.showBigImageState=true;
  }
  swipeEvnet(event){
    console.log('进入滑动');
    //是样例则不走
    if(this.yangliImg){
      return;
    }
    //向左滑
    if (event.direction == 2) {
        console.log('进入左滑动');
        
        var big_img_ti = this.big_img_ti+1;
        if(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
          this.big_img_ti = big_img_ti;
          this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_srcs[this.big_img_ti].img_src;
        }
    }

    //向右滑
    if (event.direction == 4) {
        console.log('进入左滑动');
        var big_img_ti = this.big_img_ti-1;
        console.log(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src);
        if(this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src && this.tasksListCon.tt_list[this.big_img_i].img_srcs[big_img_ti].img_src != this.avatarPath){
          this.big_img_ti = big_img_ti;
          this.big_img = this.tasksListCon.tt_list[this.big_img_i].img_srcs[this.big_img_ti].img_src;
        }
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

}
