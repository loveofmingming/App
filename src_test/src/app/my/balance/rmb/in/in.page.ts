import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../../../sample-data';

@Component({
    selector: 'app-in',
    templateUrl: './in.page.html',
    styleUrls: ['../../balance.page.scss', './in.page.scss'],
})
export class InPage implements OnInit {
    items = SampleData.bonusRmb;

    constructor() {
    }

    ngOnInit() {
    }

}
