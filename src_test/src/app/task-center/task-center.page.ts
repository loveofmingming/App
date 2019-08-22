import {Component} from '@angular/core';
import {SampleData} from '../sample-data';
import {MessagePage} from '../message/message.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-task-center',
    templateUrl: './task-center.page.html',
    styleUrls: ['./task-center.page.scss'],
})
export class TaskCenterPage {
    myTasks = SampleData.myTasks.doing;

    constructor(public modalCtrl: ModalController) {
    }

    async goMessage() {
        const options = {
            component: MessagePage,
        };
        const modal = await this.modalCtrl.create(options);
        await  modal.present();
    }
}
