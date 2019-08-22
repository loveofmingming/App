import {Component, OnInit} from '@angular/core';
import {SampleData} from '../../../sample-data';

@Component({
    selector: 'app-credit',
    templateUrl: './credit.page.html',
    styleUrls: ['../balance.page.scss', './credit.page.scss'],
})
export class CreditPage implements OnInit {
    items = SampleData.bonusCredit;

    constructor() {
    }

    ngOnInit() {
    }
}
