import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EditPage} from './edit.page';
import {LocatingPageModule} from './locating/locating.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocatingPageModule,
        IonicModule,
    ],
    declarations: [EditPage],
    entryComponents: [EditPage]
})
export class EditPageModule {
}
