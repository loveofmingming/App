import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    constructor(
        public actionSheetController: ActionSheetController,
        public alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    async toChooseAvatar() {
        const actionSheet = await this.actionSheetController.create({
            cssClass: 'action-sheet',
            buttons: [{
                text: '拍照',
                cssClass: 'button',
                handler: () => {
                }
            }, {
                text: '从手机相册选择',
                cssClass: 'button',
                handler: () => {
                }
            }, {
                text: '取消',
                cssClass: 'cancel',
                role: 'cancel',
                handler: () => {
                }
            }]
        });
        await actionSheet.present();
    }

    async toEditName() {
        const alert = await this.alertController.create({
            header: '姓名',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: '请填写您的姓名'
                },
            ],
            cssClass: 'alert',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: '保存',
                    handler: () => {
                    }
                }
            ]
        });

        await alert.present();
    }

    async toEditCompany() {
        const alert = await this.alertController.create({
            header: '公司',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: '请填写您所在的公司名称'
                },
            ],
            cssClass: 'alert',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: '保存',
                    handler: () => {
                    }
                }
            ]
        });

        await alert.present();
    }
}
