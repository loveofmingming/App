import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-input-address',
    templateUrl: './input-address.page.html',
    styleUrls: ['./input-address.page.scss'],
})
export class InputAddressPage implements OnInit {

    constructor(
        private modalCtrl: ModalController,
    ) {
    }

    ngOnInit() {
    }

    cancel() {
        this.modalCtrl.dismiss();
    }

    finish() {
        this.cancel();
    }
}
