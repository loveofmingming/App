import {Component} from '@angular/core';
import {SampleData} from '../../sample-data';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-details',
    templateUrl: './explain.page.html',
    styleUrls: ['./expain.page.scss'],
})
export class ExplainPage {
    tabSelected = 0;
    data = SampleData.taskData;
    pickable = true;

    constructor(private modalCtrl: ModalController) {

    }

    back() {
        this.modalCtrl.dismiss();
    }

    pick() {
        this.modalCtrl.dismiss({picked: true});
    }
}
