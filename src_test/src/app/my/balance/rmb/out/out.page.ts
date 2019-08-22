import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../../../sample-data';

@Component({
    selector: 'app-out',
    templateUrl: './out.page.html',
    styleUrls: ['../../balance.page.scss', './out.page.scss'],
})
export class OutPage implements OnInit {
    items = SampleData.bonusOutRmb;

    constructor() {
    }

    ngOnInit() {
    }

}
