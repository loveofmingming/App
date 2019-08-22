import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../sample-data';
import {ModalController, PopoverController} from '@ionic/angular';
import {ExplainPage} from '../explain/explain.page';
import {PhotoSlidePage} from '../photo-slide/photo-slide.page';

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: [
        './details.page.scss',
    ],
})
export class DetailsPage implements OnInit {
    items = SampleData.taskData.items;
    task = null;

    constructor(
        public modalCtrl: ModalController,
        public popCtrl: PopoverController,
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

    goEdit() {
        this.modalCtrl.dismiss({edit: true});
    }

    async showPhoto() {
        // const options = {
        //     component: PhotoSlidePage,
        //     translucent: false,
        //     cssClass: 'photo-slider',
        // };
        // const pop = await this.popCtrl.create(options);
        // await  pop.present();
    }
}
