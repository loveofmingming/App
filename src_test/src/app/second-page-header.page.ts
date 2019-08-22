import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'second-page-header',
    templateUrl: './second-page-header.page.html',
    styleUrls: ['./second-page-header.page.scss'],
})

export class SecondPageHeader {
    _backUrl: string = null;
    _isPrimary = false;

    @Input()
    set backUrl(url: string) {
        this._backUrl = url;
    }

    @Input()
    set primary(isPrimary: boolean) {
        this._isPrimary = isPrimary;
    }

    constructor(private router: Router) {
    }

    back() {
        if (this._backUrl) {
            this.router.navigate([this._backUrl]);
        }
    }
}


