import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SampleData} from '../../sample-data';
import {MessagePage} from '../../message/message.page';
import {ExplainPage} from '../explain/explain.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-pickables',
    templateUrl: './pickables.page.html',
    styleUrls: [
        '../task-center.page.scss',
        './pickables.page.scss'
    ],
})
export class PickablesPage {

    items = SampleData.pickables;

    constructor(
        public modalCtrl: ModalController,
        private router: Router
    ) {
    }

    async showExplain() {
        const options = {
            component: ExplainPage,
        };
        const modal = await this.modalCtrl.create(options);

        modal.onDidDismiss()
            .then((data) => {
                if (data.data && data.data.picked) {
                    this.goMine(null);
                }
            });

        await  modal.present();
    }

    goMine(event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.router.navigate(['/home/task-center/mine']);
    }
}
