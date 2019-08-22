import {NgModule} from '@angular/core';
import {SecondPageHeader} from './second-page-header.page';
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        SecondPageHeader,
    ],
    exports: [
        SecondPageHeader
    ]
})
export class SecondPageHeaderModule {
}

