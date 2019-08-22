import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigModel } from './config.model';
import { ToolsModel} from '../model';
@Injectable()

export class MyXiaoxisModel {
  constructor(public http: HttpClient,public tools: ToolsModel) {
  }
  private url : string = ConfigModel.BASE_URL;


    getAllOfMyXiaoxis(){ 
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/getAllOfMyXiaoxis',{});
    }
    getWeiDuXiaoXiCount(){ 
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/getWeiDuXiaoXiCount',{});
    }
    updateMyXiaoXi(con){
      return this.tools.postUrl('/xiaoxi/MyXiaoxi/updateMyXiaoXi',con);
    }

}