import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InputAddressPage} from './input-address.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [InputAddressPage],
    entryComponents: [InputAddressPage]
})
export class InputAddressPageModule {
}
