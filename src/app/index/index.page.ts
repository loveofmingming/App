import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksModel, ToolsModel,LocalStorageModel,LoginModel,JpushUtilModel } from '../model';
import {HttpClient} from '@angular/common/http';
import {ModalController,LoadingController,NavController} from '@ionic/angular'; 
import {RenwuConPage} from '../renwu-con/renwu-con.page';
import { OnEnterPage } from '../model/on-enter-page';
import {Md5} from "ts-md5/dist/md5";
import { ConfigModel } from '../model/config.model';
@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage extends OnEnterPage{

    tasksList: any;
    num: any;
    title:string;
    content:string;
    messageId:string;
    params_info:any;
    public userId:string;
    test:string;
    init:boolean;//标识是否是第一次加载
    default_img:string;
    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public taskmodel: TasksModel,
        public toolsmodel: ToolsModel,
        public httpClient: HttpClient,
        public localstorage: LocalStorageModel,
        public loginmodel: LoginModel,
        public modalCtrl:ModalController,
        public JpushUtilModel:JpushUtilModel,
        public loadingCtrl: LoadingController,
        public nav:NavController,
        public Md5:Md5
           ) {    
        super(router);
        this.tasksList = [];
        this.matchUrl = ['/default','/default/renwu','/default/renwu/pickables'];
        this.init = true;
        this.default_img = "../../assets/img/ls.png";
    }

    async ngOnInit() {
        console.log('index by wz1');
        super.ngOnInit();
    }
   
    //离开页面的时候触发
    ionViewDidLeave(){
        console.log('index by wz2');
        this.init = false;
    }

    //上面数组内链接跳转触发
    onEnter() {
        console.log('index by wz3');
        this.reload_page();
    }

    //第一次进来页面和重新加载的数据 
    async reload_page(){
        console.log('index by wz4');
        await super.showLoading(this.loadingCtrl,'加载中...');
        await this.loginmodel.LoginSessionT().then(res=>{
            console.log('index by wz5');
            let login_info:any  = res;
            if(login_info.error != '0'){
                this.router.navigateByUrl('/home');
                return;
            }
            if(this.toolsmodel.isAndroids()){
                /*消息推送配置**/
                this.JpushUtilModel.setAlias(Md5.hashStr('*&#$=zb147'+login_info.body.id).toString());//设置别名
            }
        });
        await  this.taskmodel.getAllTasks().then(res=>{
            console.log('index by wz6');
            let ress:any = res;
            if(ress.error == '0'){
                this.tasksList = ress.body;
                this.num = ress.body.length;
            }else{
                this.tasksList = '';
            }
        });
        await this.loadingCtrl.dismiss();
    }

    // 页面之间切换 出发
    ionViewDidEnter(){
        console.log('index by wz7');
        if(!this.init){
            console.log('index by wz8');
            console.log('ionViewDidEnter');
            this.reload_page();
        }
        
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
        modal.onDidDismiss().then(res=>{
            this.reload_page();
          });
        await  modal.present();
    }


}
