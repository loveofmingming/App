/**
 *消息推送处理
 *参考来源：https://github.com/jpush/jpush-phonegap-plugin
 * @ght
 */
import { Injectable } from '@angular/core';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { Router} from '@angular/router';
import { ToolsModel } from './tools.model';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class JpushUtilModel {
  private registrationId: string;
  sequence: number = 0;
  constructor(private jpush: JPush,public tools:ToolsModel,public http: HttpClient,
    public router: Router) {
    
  }
  
  initPush(){
    this.jieshou();
    this.dakaipush();
    this.jieshoubendi();
  }
  jieshou(){
      /**接收消息触发 */
      document.addEventListener('jpush.receiveNotification', (event: any) => {
        console.log("接收消息");
        console.log(event);
        let con = {
          mtid: event.extras.mtid,
          messageid: event.extras.messageid,
        };
        this.tools.postUrl('/push/Push/receiveNotificationLog',con).subscribe(res => {
          
        });
      // this.router.navigate(['/xiaoxi']);
    // this.logger.log(event,'Receive notification');
        //alert('Receive notification: ' + JSON.stringify(event));
      }, false);
  };
  dakaipush(){
    /**打开消息触发 */
    document.addEventListener('jpush.openNotification', (event: any) => {
      console.log("打开消息");
      console.log(event);
      let con = {
        mtid: event.extras.mtid,
        messageid: event.extras.messageid
      };
      //记录打开信息
      this.tools.postUrl('/push/Push/openNotificationLog',con).subscribe(res => {
          
      });
      let mytaskcon = {
        mtid:event.extras.mtid
      };
      var mtid = event.extras.mtid;
      //根据my_task_id去my_tasks表中获取task_id,组合详情页。
      this.tools.postUrl('/tasks/Tasks/getTasksIdByMyTaskId',mytaskcon).subscribe(res => {
          let ress:any = this.tools.decodeUrlList(res);
          if(ress.error=='0'){
            var taskid = ress.body.task_id;
            var action = ress.body.action;
            var link = '';
            if (action == 1) {
                link = '/renwu-zuorenwu';
            } else if (action == 2) {
                link = '/renwu-shenhezhong';
            } else if (action == 3) {
                // value.zhuangtai = '去修改';
                link = '/renwu-update-tishi';
            } else if (action == 9 ) {
                // value.zhuangtai = '领取奖励';
                link = '/renwu-tongguo';
            } else if (action == 11 ) {
                // value.zhuangtai = '已获奖励';
                link = '/renwu-wancheng';
            } else if (action == 10) {
                // value.zhuangtai = '审核未通过已过期';
                link = '/renwu-weitongguo';
            }
            //[link],{queryParams:{'mtid':mtid,'tid':taskid}}
            if(link!=''){
              this.router.navigateByUrl(link+'/'+mtid+'/'+taskid);
            }else{
              this.router.navigateByUrl(link);
            }
          }
      });

    }, false);
  };
  jieshoubendi(){
    /**接收本地消息 */
    document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
      console.log("接收本地消息");
      console.log(event);
      // this.router.navigate(['/shezhi']);
  // this.logger.log(event,'receive local notification');
    }, false);
  };
    tagResultHandler = function(result) {
      var sequence: number = result.sequence;
      var tags: Array<string> = result.tags == null ? [] : result.tags;
    // this.logger.log('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString(),'标签设置回调');
    };
  
    aliasResultHandler = function(result) {
      var sequence: number = result.sequence;
      var alias: string = result.alias;
    // this.logger.log('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias,'别名设置回调');
    };
  
    errorHandler = function(err) {
      var sequence: number = err.sequence;
    var code = err.code;
    //console.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
    //this.logger.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
    };
  /**
   * 设备的id
   */
    getRegistrationID() {
      this.jpush.getRegistrationID()
        .then(rId => {
          this.registrationId = rId;
        });
    }
  /**
   * 设置标签
   * tags:['Tag1', 'Tag2']
   */
    setTags(tags:Array<string>) {
      this.jpush.setTags({ sequence: this.sequence++, tags: tags})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 添加标签
   * tags:['Tag3', 'Tag4']
   */
    addTags(tags:Array<string>) {
      this.jpush.addTags({ sequence: this.sequence++, tags: tags})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 检测标签状态
   * * @param tag
   */
    checkTagBindState(tag:string) {
      this.jpush.checkTagBindState({ sequence: this.sequence++, tag: tag})
        .then(result => {
          var sequence = result.sequence;
          var tag = result.tag;
      var isBind = result.isBind;
    //   this.logger.log('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind,'标签状态')
        }).catch(this.errorHandler);
    }
  /**
   * 
   * @param tag 删除标签
   */
    deleteTags(tag:Array<string>) {
      this.jpush.deleteTags({ sequence: this.sequence++, tags: tag})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 获取所有标签
   */
    getAllTags() {
      this.jpush.getAllTags({ sequence: this.sequence++ })
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   *清空所有标签
   */
    cleanTags() {
      this.jpush.cleanTags({ sequence: this.sequence++ })
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * @param alias 设置别名
   */
    setAlias(alias:string) {
      this.jpush.setAlias({ sequence:this.sequence?this.sequence++:1, alias: alias })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 获取所有别名
   */
    getAlias() {
      this.jpush.getAlias({ sequence: this.sequence++ })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 删除所有别名
   */
    deleteAlias() {
      this.jpush.deleteAlias({ sequence: this.sequence++ })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 添加本地消息
   */
    addLocalNotification() {
    //   if (this.nativeService.isAndroid()) {
    //     this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
    //   } else {
    //     this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
    //   }
  }
 
}