import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { sqliteServiceModel,ToolsModel,JpushUtilModel } from './model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private sqliteServiceModel: sqliteServiceModel,
    public toolsmodel: ToolsModel,
    public jpush:JPush,
    public JpushUtilModel:JpushUtilModel,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.sqliteServiceModel.initDB();

      if(this.toolsmodel.isAndroids()){

        /**极光推送开启 */
        this.jpush.init();//插件初始化
        this.jpush.setDebugMode(true);
        /*消息推送配置**/
        this.JpushUtilModel.initPush();//监听初始化
        // this.JpushUtilModel.setAlias(this.userId);    //设置别名
      }


    });
  }
}
