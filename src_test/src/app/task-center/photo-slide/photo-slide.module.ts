import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PhotoSlidePage} from './photo-slide.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [PhotoSlidePage],
    entryComponents: [PhotoSlidePage]
})
export class PhotoSlidePageModule {
}
