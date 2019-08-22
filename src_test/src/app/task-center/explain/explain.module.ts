import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {ExplainPage} from './explain.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [ExplainPage],
    entryComponents: [ExplainPage],
})
export class ExplainPageModule {
    constructor(private modalCtrl: ModalController) {

    }

    back() {
        this.modalCtrl.dismiss();
    }
}
