import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../sample-data';
import {ModalController} from '@ionic/angular';
import {ExplainPage} from '../explain/explain.page';
import {DetailsPage} from '../details/details.page';
import {EditPage} from '../edit/edit.page';

@Component({
    selector: 'app-mine',
    templateUrl: './mine.page.html',
    styleUrls: [
        '../task-center.page.scss',
        './mine.page.scss'
    ],
})
export class MinePage implements OnInit {
    items = SampleData.myTasks;

    constructor(
        public modalCtrl: ModalController
    ) {
    }

    ngOnInit() {
    }

    async show(item) {
        if (item.state === 1) {
            await this.showExplain();
        } else {
            await this.showDetails(item);
        }
    }

    async edit(event, item) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        const options = {
            component: EditPage,
            componentProps: {
                state: item.state
            }
        };
        const modal = await this.modalCtrl.create(options);
        await  modal.present();

    }

    async showDetails(item) {
        const options = {
            component: DetailsPage,
            componentProps: {
                task: item
            }
        };
        const modal = await this.modalCtrl.create(options);
        modal.onDidDismiss()
            .then((data) => {
                if (data.data && data.data.edit) {
                    this.edit(null, 3);
                }
            });
        await  modal.present();

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
}
