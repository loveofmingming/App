import {Component, OnInit} from '@angular/core';
import {SampleData} from '../sample-data';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
    iconNames = ['sys_message', 'folder', 'bonus'];
    items = SampleData.messages;

    constructor(private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    back() {
        this.modalCtrl.dismiss();
    }

}
