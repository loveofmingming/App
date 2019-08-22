import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {LocatingPage} from './locating.page';
import {InputAddressPageModule} from '../input-address/input-address.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InputAddressPageModule,
    ],
    declarations: [LocatingPage],
    entryComponents: [LocatingPage],
})
export class LocatingPageModule {
}
