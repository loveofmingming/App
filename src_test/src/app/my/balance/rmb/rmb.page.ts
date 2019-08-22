import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-rmb',
    templateUrl: './rmb.page.html',
    styleUrls: ['../balance.page.scss', './rmb.page.scss'],
})
export class RmbPage implements OnInit {
    static withDrawTip = {
        message:
        '<ul>' +
        '<li>请添加 微信号: 1123232434</li>' +
        '<li>红包提现。</li>' +
        '</ul>',
        cssClass: 'alert',
        buttons: ['好的']
    };

    constructor(public alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    async toWithdraw() {
        const _alert = await this.alertCtrl.create(RmbPage.withDrawTip);
        await _alert.present();
    }
}
