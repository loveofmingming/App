import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {RmbPage} from './balance/rmb/rmb.page';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my',
    templateUrl: './my.page.html',
    styleUrls: ['./my.page.scss'],
})
export class MyPage {
    constructor(public alertCtrl: AlertController, private router: Router) {
    }

    async toWithdraw() {
        const _alert = await this.alertCtrl.create(RmbPage.withDrawTip);
        await _alert.present();
    }

    goProfile() {
        this.router.navigate(['profile']);
    }
}
