import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {InputAddressPage} from '../input-address/input-address.page';

@Component({
    selector: 'app-locating',
    templateUrl: './locating.page.html',
    styleUrls: ['./locating.page.scss'],
})
export class LocatingPage {

    constructor(private modalCtrl: ModalController) {
    }

    cancel() {
        this.modalCtrl.dismiss();
    }

    finish() {
        this.cancel();
    }

    async showInputAddress() {
        const options = {
            component: InputAddressPage,
        };
        const modal = await this.modalCtrl.create(options);
        await  modal.present();
    }

    // ionViewWillLoad() {
    //     const data = this.navParams.get('data');
    //     console.log(data);
    // }
    //
    // close() {
    //     const data = {
    //         name: 'John Doe',
    //         occupation: 'Milkman'
    //     };
    //     this.view.dismiss(data);
    // }
}
