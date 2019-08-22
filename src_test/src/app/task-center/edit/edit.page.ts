import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../sample-data';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {LocatingPage} from './locating/locating.page';
import {ExplainPage} from '../explain/explain.page';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    items = SampleData.taskData.items;
    state = 0;

    constructor(
        public actionSheetController: ActionSheetController,
        public modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
    }

    async showExplain() {
        const options = {
            component: ExplainPage,
            componentProps: {
                pickable: false
            }
        };
        const modal = await this.modalCtrl.create(options);
        await  modal.present();
    }

    back() {
        this.modalCtrl.dismiss();
    }

    async locate() {
        const options = {
            component: LocatingPage,
        };
        const modal = await this.modalCtrl.create(options);
        await  modal.present();
    }

    async toUploadPhoto() {
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
}
