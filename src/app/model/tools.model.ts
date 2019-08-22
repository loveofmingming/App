import { Injectable } from '@angular/core';
import { ConfigModel } from '../model/config.model';
import { Http, Headers, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Platform,LoadingController} from '@ionic/angular';
@Injectable()

export class ToolsModel {
  headers:any;
  options:any;
  url:string;
  loading:any;
  constructor(
              public http: HttpClient,
              public platform:Platform,
              public loadingCtrl:LoadingController
            ) { 
              this.url = ConfigModel.BASE_URL;
  }
 

  postUrl(post_url:any,data:any,type:any=true)
  {
    if(type){
      this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let pramasJs = JSON.stringify(data);
      this.options = new RequestOptions({ headers: this.headers,withCredentials: true});
      return this.http.post(this.url+post_url,pramasJs,this.options);
    }else{
      //form表单上传文件
      let pramasJs = data;
      return this.http.post(this.url+post_url,pramasJs,{withCredentials:true});
    }
  }

  async postUrlTongbu(post_url:any,data:any)
  {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let pramasJs = JSON.stringify(data);
      this.options = new RequestOptions({ headers: this.headers,withCredentials: true});
      //return this.http.post(this.url + '/tasks/Tasks/getTasks', this.options);
      let jsonData:any;
      await this.http.post(this.url+post_url,pramasJs,this.options).toPromise().then(res=>{
        jsonData = this.decodeUrlList(res);
      });
      return jsonData;
  } 
  
//解析php中encodeurl
decodeUrlList(list){
    var new_list = [];
    if(list.constructor === String){
      return decodeURIComponent(list);
    }else{
      for(var o in list){ 
        new_list[o] = (list[o].constructor === String)?decodeURIComponent(list[o]):this.decodeUrlList(list[o]);
       }
    }
   
    return new_list;
  }



  /**
   * 获取当前时间
   */
  getTodayTime(){
    return new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
  }

  /**
   * 获取当前时间 增加几个小时
   */
  getTodayTimeAddHours(hours:number){
    return new Date(+new Date()+8*3600*1000+hours*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
  }
  /**
   * @returns {boolean}
   * @memberof 
   */
  isMobile(){
      // return this.platform.is("mobile") && !this.platform.is("mobileweb");
      return this.platform.is("mobile");
  }
  /**
   * @returns {boolean}
   * @memberof 
   */
  isAndroids(){
      return this.isMobile() && this.platform.is("android");
  }

  /**
   * 删除方法
   * @param list 
   * @param index 
   */
  Arrayremove(list,index) { 
    //检查index位置是否有效
    if(index >= 0 && index < list.length){
       var part1 = list.slice(0, index);
       var part2 = list.slice(index);
       part1.pop();
       return (part1.concat(part2)); 
      } 
      return list; 
  }

}