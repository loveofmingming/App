import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DetailsPage} from './details.page';
import {ExplainPageModule} from '../explain/explain.module';
import {PhotoSlidePage} from '../photo-slide/photo-slide.page';
import {PhotoSlidePageModule} from '../photo-slide/photo-slide.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PhotoSlidePageModule,
        ExplainPageModule,
    ],
    declarations: [DetailsPage],
    entryComponents: [DetailsPage]
})
export class DetailsPageModule {
}
