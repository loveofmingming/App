import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-photo-slide',
    templateUrl: './photo-slide.page.html',
    styleUrls: ['./photo-slide.page.scss'],
})
export class PhotoSlidePage implements OnInit {
    slideOpts = {
        effect: 'flip'
    };
    
    constructor() {
    }

    ngOnInit() {
    }

}
