import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import {Md5} from 'ts-md5/dist/md5';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { Clipboard } from '@ionic-native/clipboard/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
// import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

import { TasksModel, ToolsModel, MapModel, CameraModel, MyTasksModel, LoginModel,
   // tslint:disable-next-line:max-line-length
   LocalStorageModel, SessionStorageModel, XiaoJinKusModel, DaoHangBisModel, XinYuZhisModel, UpdateUserInfoModel , MyXiaoxisModel, PullWebModel, sqliteServiceModel, JpushUtilModel } from './model';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    FileTransfer,
    File,
    Sim,
    Geolocation,
    CameraModel,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TasksModel,
    MyTasksModel,
    ToolsModel,
    MapModel,
    XiaoJinKusModel,
    DaoHangBisModel,
    XinYuZhisModel,
    MapModel,
    LoginModel,
    LocalStorageModel,
    SessionStorageModel,
    UpdateUserInfoModel,
    MyXiaoxisModel,
    PullWebModel,
    sqliteServiceModel,
    JPush,
    JpushUtilModel,
    // OpenNativeSettings,
    Clipboard,
    Md5
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
